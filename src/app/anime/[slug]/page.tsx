import AnimeComments from "@/components/component/AnimeComments";
import NewComment from "@/components/component/NewComment";
import { createClient } from "@/utils/supabase/server";
import { unstable_cache } from "next/cache";

import { cookies } from "next/headers";

export default async function Page({ params }: { params: { slug: string } }) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const fetchAnime = async () => {
    let { data: anime, error: animeError } = await supabase
      .from("anime")
      .select("*")
      .eq("id", params.slug);
    return anime;
  };
  const getCachedAnime = unstable_cache(
    fetchAnime,
    [params.slug], // You can adjust the keyParts as needed
    { revalidate: 3600 } // Cache for 1 hour (3600 seconds)
  );

  const anime = await getCachedAnime();

  let { data: rawcomments, error: commentError } = await supabase
    .from("comments")
    .select("*, author: profiles(*), likes: comment_likes(user_id)")
    .order("created_at", { ascending: false })
    .eq("anime_id", params.slug)
    .range(0, 9);

  const comments =
    rawcomments?.map((comment) => ({
      ...comment,
      author: Array.isArray(comment.author)
        ? comment.author[0]
        : comment.author,
      user_has_liked_comment:
        (comment.likes &&
          Array.isArray(comment.likes) &&
          comment.likes.some((like: any) => like.user_id === user?.id)) ||
        false,
      likes:
        comment.likes && Array.isArray(comment.likes)
          ? comment.likes.length
          : 0,
      isAuthor: comment.author.id === user?.id,
    })) ?? [];

  if (commentError) {
    console.log(commentError);
  }

  return (
    <>
      <h1>{anime?.[0].title}</h1>
      <p>{anime?.[0].url}</p>
      <p>{anime?.[0].rating}</p>

      <NewComment anime_id={params.slug} />
      <AnimeComments comments={comments} />
    </>
  );
}
