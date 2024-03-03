import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import React from "react";
import { redirect } from "next/navigation";
import Profilecard from "./components/profilecard";
import Countcard from "./components/count";
import SwitchTheme from "@/components/component/switchtheme";
import { LogoutButton } from "@/components/component/AuthButton";
export default async function Profile() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { data, error } = await supabase.auth.getUser();
  if (!data.user) redirect("/login");
  return (
    <div className="w-screen">
      {data.user && <Profilecard user={data.user} />}
      {data.user && (
        <div className=" ">
          <Countcard user={data.user} />
          <div className="w-screen flex justify-center my-10">
            <div className="w-[5rem] h-[3rem] bg-default  flex justify-center rounded-md">
              <LogoutButton />
            </div>
          </div>
        </div>
      )}
      {data.user && (
        <div className="w-screen absolute flex top-0 my-2">
          <div className="absolute right-0">
            <SwitchTheme />
          </div>
        </div>
      )}
    </div>
  );
}
