import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import CommentLike from "@/components/component/CommentLike";
import Image from "next/image";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { useRouter } from "next/navigation";
import CommentDelete from "./CommentDelete";

dayjs.extend(relativeTime);

export default function AnimeComments({ comments }: { comments: any[] }) {
  const handleDelete = async (data: FormData) => {
    "use server";
    const itemId = data.get("itemId");
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    const { error } = await supabase.from("comments").delete().eq("id", itemId);
    if (error) {
      console.log("delete error: ", error);
    }
  };
  return (
    <>
      {comments?.map((comment) => (
        <div key={comment.id}>
          <div className="h-12 w-12">
            <Image
              className="rounded-full"
              src={comment.author.avatar_url}
              alt="comment user avatar"
              width={48}
              height={48}
            />
          </div>
          <p className="inline-block">
            {`${comment.author.name} ${comment.author.username} ${dayjs(
              comment.created_at
            ).fromNow()}`}
          </p>
          <p>{comment.title}</p>
          <CommentDelete comment={comment} />
          {/* {comment.isAuthor ? (
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
          )} */}

          <CommentLike comment={comment} />
        </div>
      ))}
    </>
  );
}
