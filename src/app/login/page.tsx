import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import {
  GithubButton,
  LogoutButton,
} from "../../components/component/AuthButton";

export default async function LoginPage() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data, error } = await supabase.auth.getUser();

  return (
    <>
      <div className="max-w-sm w-full my-auto mx-auto">
        <div className="flex flex-col gap-4 pt-72 p-4 justify-center items-center align-middle">
          {data.user ? (
            <>
              <p>Hello {data?.user?.email}</p>
              <LogoutButton />{" "}
            </>
          ) : (
            <>
              <p className=" text-center font-bold">Not logged in</p>
              <GithubButton />
            </>
          )}
        </div>
      </div>
    </>
  );
}
