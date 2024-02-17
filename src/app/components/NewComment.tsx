import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export default function NewTweet() {
  const addTweet = async (formData: FormData) => {
    "use server";
    const title = String(formData.get("title"));
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) {
      await supabase.from("comment").insert({ title, user_id: user.id });
    }
  };

  return (
    <form action={addTweet}>
      <input name="title" className="bg-inherit" />
    </form>
  );
}
