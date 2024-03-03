import { CarouselPlugin } from "@/components/component/CarouselPlugin";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { unstable_cache } from "next/cache";
import TopAnimesSection from "../components/component/TopAnimesSection";

import dynamic from "next/dynamic";
const SwitchTheme = dynamic(
  () => import("@/components/component/switchtheme"),
  {
    ssr: false,
  }
);

export default async function Home() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const fetchTrendingAnime = async () => {
    let { data: animesTrending, error: errorTrending } = await supabase
      .from("anime")
      .select("*")
      .eq("SFW", true)
      .order("rating", { ascending: false })
      .range(20, 29);
    return animesTrending;
  };

  const getCachedTrendingAnime = unstable_cache(
    fetchTrendingAnime,
    ["trending-anime"], // You can adjust the keyParts as needed
    { revalidate: 3600 } // Cache for 1 hour (3600 seconds)
  );

  const trendingAnime = await getCachedTrendingAnime();

  const fetchTopAnime = async () => {
    let { data: animesTopTen, error: errorTopTen } = await supabase
      .from("anime")
      .select("*,anime-genre(anime_id,Genre_id),genre(id,genrename)")
      .eq("SFW", true)
      .order("rating", { ascending: false })
      .range(0, 19);
    return animesTopTen;
  };

  const getCachedTopAnime = unstable_cache(
    fetchTopAnime,
    ["top-anime"], // You can adjust the keyParts as needed
    { revalidate: 3600 } // Cache for 1 hour (3600 seconds)
  );

  const topAnime = await getCachedTopAnime();

  return (
    <>
      <div className="absolute top-4 right-1">
        <SwitchTheme />
      </div>
      <div className="max-w-md w-full mx-auto">
        {/* <CarouselDemo /> */}
        {/* <CarouselHighlight animes={animes} /> */}
        <div className="text-xl font-bold px-2 py-4">Trending</div>
        <CarouselPlugin animes={trendingAnime} />
        <div className="text-xl font-bold px-2 pt-4">Top Rating</div>
        <TopAnimesSection animes={topAnime} />
      </div>
    </>
  );
}
