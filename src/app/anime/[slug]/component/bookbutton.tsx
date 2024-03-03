"use client";
import { FaBookBookmark } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/client";
import { useState } from "react";
export default function Bookbutton({ bookmarkstatus, anime_id, user_id }: any) {
  const supabase = createClient();
  const [status, setStatus] = useState(bookmarkstatus);
  const putbookmark = async () => {
    if (status) {
      let { error } = await supabase
        .from("bookmarks")
        .delete()
        .eq("anime_id", anime_id)
        .eq("user_id", user_id);
      setStatus(false);
      console.log(error);
    } else {
      let { error } = await supabase
        .from("bookmarks")
        .insert([{ anime_id: anime_id, user_id: user_id }]);
      setStatus(true);
      console.log(error);
    }
  };
  return (
    <div>
      <Button
        variant={status ? "destructive" : "outline"}
        onClick={putbookmark}
      >
        <div className="flex gap-0 justify-center items-center">
          <FaBookBookmark />
          <div className="pb-1 pl-1">BookMark</div>
        </div>
      </Button>
    </div>
  );
}
