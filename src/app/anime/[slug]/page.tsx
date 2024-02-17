import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export default async function Page({ params }: { params: { slug: string } }) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  let { data: anime, error } = await supabase
    .from("anime")
    .select("*")
    .eq("id", params.slug);

  if (error) {
    console.log(error);
  }
  return (
    <>
      <h1>{anime?.[0].title}</h1>
      <p>{anime?.[0].url}</p>
      <p>{anime?.[0].rating}</p>
    </>
  );
}
