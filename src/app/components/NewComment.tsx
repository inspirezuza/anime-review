import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export default function NewComment({ anime_id }: { anime_id: string }) {
  const addTweet = async (formData: FormData) => {
    "use server";
    const title = String(formData.get("title"));
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) {
      const { data, error } = await supabase
        .from("comments")
        .insert([{ anime_id, user_id: user.id, title }])
        .select();

      console.log("comment added");
    }
  };

  return (
    <form action={addTweet}>
      <input name="title" className="bg-inherit" />
      <button type="submit">submit</button>
    </form>
  );
}
