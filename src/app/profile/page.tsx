import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import React from "react";
import { redirect } from "next/navigation";
import Profilecard from "./components/profilecard";
import Countcard from "./components/count";
import { LogoutButton } from "@/components/component/AuthButton";

import dynamic from "next/dynamic";
const SwitchTheme = dynamic(
  () => import("@/components/component/switchtheme"),
  {
    ssr: false,
  }
);

export default async function Profile() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { data, error } = await supabase.auth.getUser();
  if (!data.user) redirect("/login");
  return (
    <>
      <div className="flex justify-between items-center p-4 bg-slate-50 dark:bg-black border-b-2">
        <div className="text-xl font-bold">Profile</div>
        <SwitchTheme />
      </div>
      <div className="max-w-sm mx-auto w-full h-screen overflow-hidden">
        {data.user && <Profilecard user={data.user} />}
        {data.user && (
          <div className=" ">
            <Countcard user={data.user} />
            <div className="w-full flex justify-center my-10">
              {/* <div className="w-[5rem] h-[3rem] bg-default  flex justify-center rounded-md"> */}
              <LogoutButton />
              {/* </div> */}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
