import { CarouselPlugin } from "@/components/component/CarouselPlugin";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import TopTenSection from "../components/component/TopTenSection";

export default async function Home() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  let { data: animesTrending, error: errorTrending } = await supabase
    .from("anime")
    .select("*")
    .eq("SFW", true)
    .order("rating", { ascending: false })
    .range(20, 29);

  let { data: animesTopTen, error: errorTopTen } = await supabase
    .from("anime")
    .select("*,anime-genre(anime_id,Genre_id),genre(id,genrename)")
    .eq("SFW", true)
    .order("rating", { ascending: false })
    .range(0, 19);
  // setAnime(anime);
  // setLoading(false);
  // console.log(animes);
  // animes?.map((anime: any) => {
  //   console.log(anime);
  // });
  return (
    <div>
      {/* <CarouselDemo /> */}
      {/* <CarouselHighlight animes={animes} /> */}
      <div className="font-bold px-2 py-4">Trending</div>
      <CarouselPlugin animes={animesTrending} />
      <div className="font-bold px-2 py-4">Top Rating</div>
      <TopTenSection animes={animesTopTen} />
    </div>
  );
}
