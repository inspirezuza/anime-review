"use server";
import React, { useState } from "react";
import { createClient } from "@/utils/supabase/client";

interface Props {
  user: any;
}

export default async function Countcard(data: { user: any }) {
  const supabase = createClient();
  const getbookmarkcount = async () => {
    const {
      data: bookmark,
      error,
      count,
    } = await supabase
      .from("bookmarks")
      .select("*", { count: "exact", head: true })
      .eq("user_id", data.user.id);
    return count;
  };
  const getcommentcount = async () => {
    const {
      data: comment,
      error,
      count,
    } = await supabase
      .from("comments")
      .select("*", { count: "exact", head: true })
      .eq("user_id", data.user.id);
    return count;
  };
  return (
    <div className="w-full">
      <div className="grid grid-cols-2 ">
        <div>
          <div className="font-semibold text-center">Bookmark</div>
          <div className=" text-center">{getbookmarkcount()}</div>
        </div>
        <div>
          <div className="font-semibold text-center">Comment</div>
          <div className="text-center">{getcommentcount()}</div>
        </div>
      </div>
    </div>
  );
}
