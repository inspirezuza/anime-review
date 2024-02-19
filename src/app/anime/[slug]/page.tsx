import AnimeComments from "@/app/components/AnimeComments";
import NewComment from "@/app/components/NewComment";
import { createClient } from "@/utils/supabase/server";

import { cookies } from "next/headers";

export default async function Page({ params }: { params: { slug: string } }) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const {
    data: { user },
  } = await supabase.auth.getUser();
  let { data: anime, error: animeError } = await supabase
    .from("anime")
    .select("*")
    .eq("id", params.slug);

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

  if (animeError) {
    console.log(animeError);
  }

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
