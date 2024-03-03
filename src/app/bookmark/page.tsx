import dynamic from "next/dynamic";
import { cookies } from "next/headers";
import { Button } from "@nextui-org/react";
import { createClient } from "@/utils/supabase/server";
import Animelist from "./component/animelist";
import Link from "next/link";
const SwitchTheme = dynamic(
  () => import("@/components/component/switchtheme"),
  {
    ssr: false,
  }
);

export default async function BookMark() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { data, error } = await supabase.auth.getUser();

  return (
    <div className="w-screen h-full ">
      <div className="flex justify-between items-center p-4 bg-slate-50 dark:bg-black border-b-2">
        <div className="text-xl font-bold">Bookmarks</div>
        <SwitchTheme />
      </div>
      <div className="w-screen">
        {!data.user ? (
          <div className="mt-[20rem] flex flex-col justify-center items-center">
            <h1>{"Doesn't Login yet!"}</h1>
            <Link href="/login">
              <Button>Login</Button>
            </Link>
          </div>
        ) : (
          <div>
            <Animelist uid={data.user.id}></Animelist>
          </div>
        )}
      </div>
    </div>
  );
}
