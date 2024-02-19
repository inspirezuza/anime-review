import NewComment from "@/app/components/NewComment";
import { createClient } from "@/utils/supabase/server";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

import { cookies } from "next/headers";
import Image from "next/image";

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

  let { data: comments, error: commentError } = await supabase
    .from("comments")
    .select("*, profiles(*)")
    .order("created_at", { ascending: false })
    .eq("anime_id", params.slug)
    .range(0, 9);

  if (animeError) {
    console.log(animeError);
  }

  if (commentError) {
    console.log(commentError);
  }

  console.log(comments);

  const handleDelete = async (data: FormData) => {
    "use server";
    const itemId = data.get("itemId");
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    const { error } = await supabase.from("comments").delete().eq("id", itemId);
    if (!error) {
      console.log("delete success");
    }
  };
  return (
    <>
      <h1>{anime?.[0].title}</h1>
      <p>{anime?.[0].url}</p>
      <p>{anime?.[0].rating}</p>

      <NewComment anime_id={params.slug} />

      {comments?.map((comment) => (
        <div key={comment.id}>
          <div className="h-12 w-12">
            <Image
              className="rounded-full"
              src={comment.profiles.avatar_url}
              alt="comment user avatar"
              width={48}
              height={48}
            />
          </div>
          <p className="inline-block">{comment.profiles.name} </p>
          <p className="inline-block">{comment.profiles.username}</p>
          <p>{dayjs(comment.created_at).fromNow()}</p>
          <p>{comment.title}</p>
          {user && comment.profiles.id === user.id ? (
            <form action={handleDelete}>
              <input
                name="itemId"
                className="hidden"
                defaultValue={comment.id}
              />
              <button type="submit" className="text-red-600">
                Delete
              </button>
            </form>
          ) : (
            <></>
          )}
        </div>
      ))}
    </>
  );
}
