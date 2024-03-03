import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { revalidatePath } from "next/cache";
import Link from "next/link";

export default async function NewComment({ anime_id }: { anime_id: string }) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const addTweet = async (formData: FormData) => {
    "use server";
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const title = String(formData.get("title"));
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
    <div>
      {user ? (
        <form
          className="flex justify-center w-full max-w-md items-center space-x-2"
          action={addTweet}
        >
          <Input name="title" placeholder="Add new comment!" />
          <Button type="submit">submit</Button>
        </form>
      ) : (
        <Link className="" href={"/login"}>
          <Button className="w-full max-w-md mx-auto p-4">
            login to comment
          </Button>
        </Link>
      )}
    </div>
  );
}
