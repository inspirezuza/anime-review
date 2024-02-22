"use client";

import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

export default function CommentLike({ comment }: { comment: any }) {
  const router = useRouter();
  const handleLikes = async () => {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) {
      if (comment.user_has_liked_comment) {
        await supabase
          .from("comment_likes")
          .delete()
          .match({ user_id: user.id, comment_id: comment.id });
      } else {
        await supabase
          .from("comment_likes")
          .insert([{ user_id: user.id, comment_id: comment.id }]);
      }
      router.refresh();
    }
  };
  return (
    <div>
      <button onClick={handleLikes} className="text-blue-600">
        {`${comment.likes} Likes`}
      </button>
    </div>
  );
}
