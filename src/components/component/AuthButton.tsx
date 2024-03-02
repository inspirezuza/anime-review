"use client";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { Button } from "../ui/button";
import { FaGithub } from "react-icons/fa";

export async function GithubButton() {
  const supabase = createClient();
  const githubSignIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "github",
      options: { redirectTo: `${location.origin}/auth/confirm` },
    });
  };
  return (
    <>
      <Button
        className="flex gap-2 justify-center items-center"
        onClick={githubSignIn}
      >
        <FaGithub />
        Login Github
      </Button>
    </>
  );
}

export async function LogoutButton() {
  const supabase = createClient();
  const router = useRouter();
  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };
  return (
    <>
      <Button className="text-xs" onClick={handleSignOut}>
        Logout
      </Button>
    </>
  );
}
