"use client";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

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
      <button onClick={githubSignIn}>Github</button>
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
      <button className="text-xs text-gray-400" onClick={handleSignOut}>
        Logout
      </button>
    </>
  );
}
