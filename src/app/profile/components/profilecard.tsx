import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import React from "react";

import { Avatar } from "@nextui-org/react";
export default function Profilecard(data: { user: any }) {
  return (
    <div className="w-full">
      <div className="flex flex-col items-center">
        <div className=" mt-10">
          <div className="flex gap-3 items-center">
            <Avatar
              isBordered
              src={data.user?.user_metadata.avatar_url}
              size="lg"
              className="w-[10rem] h-[10rem]"
            />
          </div>
        </div>
        <div className="w-full flex flex-col items-center my-5">
          <h1 className=" text-lg font-bold">
            {data.user?.user_metadata.preferred_username}
          </h1>
          <h1 className=" text-gray-500">{data?.user?.email}</h1>
        </div>
      </div>
    </div>
  );
}
