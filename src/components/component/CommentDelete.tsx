"use client";

import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

export default function CommentDelete({ comment }: any) {
  const router = useRouter();

  const handleDelete = async () => {
    // const itemId = data.get("itemId");
    const supabase = createClient();
    const { error } = await supabase
      .from("comments")
      .delete()
      .eq("id", comment.id);
    if (error) {
      console.log("delete error: ", error);
    }
    router.refresh();
  };
  return (
    <>
      {comment.isAuthor ? (
        // <form action={handleDelete}>
        //   <input name="itemId" className="hidden" defaultValue={comment.id} />
        <button onClick={handleDelete} type="submit" className="text-red-600">
          Delete
        </button>
      ) : (
        // </form>
        <></>
      )}
    </>
  );
}
