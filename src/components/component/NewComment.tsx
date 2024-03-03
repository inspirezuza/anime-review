import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { revalidatePath } from "next/cache";

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
    revalidatePath(`/anime/${anime_id}`);
  };

  return (
    <form
      className="flex justify-center w-full max-w-md items-center space-x-2"
      action={addTweet}
    >
      <Input name="title" placeholder="Add new comment!" />
      <Button type="submit">submit</Button>
    </form>
  );
}
