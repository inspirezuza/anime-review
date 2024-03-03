import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import CommentLike from "@/components/component/CommentLike";
import Image from "next/image";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import CommentDelete from "./CommentDelete";
import Link from "next/link";

dayjs.extend(relativeTime);

export default async function AnimeComments({ comments }: { comments: any[] }) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { data: user, error } = await supabase.auth.getUser();

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
        <div className="p-2 py-4 border-b-2" key={comment.id}>
          <div className="flex">
            <Link href={`https://github.com/${comment.author.username} `}>
              <div className="h-12 w-12 ">
                <Image
                  className="rounded-full"
                  src={comment.author.avatar_url}
                  alt="comment user avatar"
                  width={48}
                  height={48}
                />
              </div>
            </Link>
            <div className="flex flex-col px-2 w-full">
              <div className="flex justify-between items-center  w-full">
                <div className="flex items-center align-middle gap-1">
                  <Link
                    className="flex gap-1"
                    href={`https://github.com/${comment.author.username} `}
                  >
                    <p className="font-bold ">{`${comment.author.name}`}</p>
                    <div className="text-foreground-400 font-normal">{`@${comment.author.username}`}</div>
                  </Link>
                  <div className="text-foreground-400 font-normal">{`· ${dayjs(
                    comment.created_at
                  ).fromNow()}`}</div>
                </div>
                <CommentDelete className="" comment={comment} />
              </div>
              <div className="pb-1">{comment.title}</div>
              <div className="flex gap-4">
                <CommentLike comment={comment} user={user} />
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
