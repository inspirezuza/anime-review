import { Carousel as Carouselflow } from "flowbite-react";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import Image from "next/image";

const supabase = createClient();

export default function Carousel() {
  const [anime, setAnime] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchAnime = async () => {
    setLoading(true);
    let { data: anime, error } = await supabase
      .from("anime")
      .select("*,anime-genre(anime_id,Genre_id),genre(id,genrename)")
      .eq("SFW", true)
      .order("rating", { ascending: false })
      .range(0, 5);
    setAnime(anime);
    setLoading(false);
    console.log(anime);
  };
  useEffect(() => {
    fetchAnime();
  }, []);
  return (
    <div>
      <div className="h-[15rem] w-screen">
        {loading ? (
          <Carouselflow>
            <Image src="/carousel-1.svg" alt="..." width={800} height={800} />
          </Carouselflow>
        ) : (
          <Carouselflow>
            {anime.map((anime: any) => (
              <div key={anime.id}>
                <Image
                  src={anime.main_picture}
                  width={100}
                  height={50}
                  alt={anime.title}
                  className=" object-cover w-full h-full"
                ></Image>
              </div>
            ))}
          </Carouselflow>
        )}
      </div>
      <div className="w-screen">
        <div>Top Rating</div>
        {!loading &&
          anime.map((anime: any, index: number) => (
            <div
              key={index}
              className="grid grid-cols-2 mx-2 my-2 items-center"
            >
              <div>
                <div>
                  {index + 1}.{anime.title}
                </div>
                <div>Rating : {anime.rating}</div>
                <div className="flex text-gray-600 gap-2">
                  {anime.genre.map((genre: any) => (
                    <div key={genre.id} className="flex">
                      {`${genre.genrename}`}
                    </div>
                  ))}
                </div>
              </div>
              <div className="w-full flex justify-center">
                <Image
                  src={anime.main_picture}
                  width={100}
                  height={50}
                  alt={anime.title}
                  className=" object-cover"
                ></Image>
              </div>
            </div>
          ))}
        <div className="h-[5rem]"></div>
      </div>
    </div>
  );
}
