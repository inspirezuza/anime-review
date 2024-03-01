import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import {
  GithubButton,
  LogoutButton,
} from "../../components/component/AuthButton";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data, error } = await supabase.auth.getUser();

  return (
    <>
      {data.user ? <p>Hello {data?.user?.email}</p> : <p>Not logged in</p>}
      <GithubButton />
      <LogoutButton />
    </>
  );
}
