"use client";

import { createClient } from "@/utils/supabase/client";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CommentLike({ comment, user }: any) {
  const router = useRouter();
  const handleLikes = async () => {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) {
      if (comment.user_has_liked_comment) {
        await supabase
          .from("likes")
          .delete()
          .match({ user_id: user.id, comment_id: comment.id });
      } else {
        await supabase
          .from("likes")
          .insert([{ user_id: user.id, comment_id: comment.id }]);
      }
      router.refresh();
    }
  };
  console.log(user);
  return (
    <div>
      {user.user ? (
        <button onClick={handleLikes} className="group flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`group-hover:fill-red-600 group-hover:stroke-red-600 ${
              comment.user_has_liked_comment
                ? "fill-red-600 stroke-red-600"
                : "fill-none stroke-gray-500"
            }`}
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
          </svg>
          <span
            className={`ml-2 text-sm group-hover:text-red-600 ${
              comment.user_has_liked_comment ? "text-red-600" : "text-gray-500"
            }`}
          >
            {comment.likes}
          </span>
        </button>
      ) : (
        <Link href={"/login"}>
          <button onClick={handleLikes} className="group flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`group-hover:fill-red-600 group-hover:stroke-red-600 ${
                comment.user_has_liked_comment
                  ? "fill-red-600 stroke-red-600"
                  : "fill-none stroke-gray-500"
              }`}
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
            <span
              className={`ml-2 text-sm group-hover:text-red-600 ${
                comment.user_has_liked_comment
                  ? "text-red-600"
                  : "text-gray-500"
              }`}
            >
              {comment.likes}
            </span>
          </button>
        </Link>
      )}
    </div>
  );
}
