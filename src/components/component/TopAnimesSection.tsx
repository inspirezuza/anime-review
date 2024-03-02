// import { Carousel as Carouselflow } from "flowbite-react";
// import { useEffect, useState } from "react";
// import { createClient } from "@/utils/supabase/client";
import Image from "next/image";
import { Ratings } from "./Ratings";
import Link from "next/link";

// const supabase = createClient();

export default function TopAnimesSection({ animes }: any) {
  // const [anime, setAnime] = useState<any>([]);
  // const [loading, setLoading] = useState<boolean>(true);

  // const fetchAnime = async () => {
  //   setLoading(true);
  //   let { data: anime, error } = await supabase
  //     .from("anime")
  //     .select("*,anime-genre(anime_id,Genre_id),genre(id,genrename)")
  //     .eq("SFW", true)
  //     .order("rating", { ascending: false })
  //     .range(0, 5);
  //   setAnime(anime);
  //   setLoading(false);
  //   console.log(anime);
  // };
  // useEffect(() => {
  //   fetchAnime();
  // }, []);
  // console.log(animes);
  return (
    <div>
      {/* <div className="h-[15rem] w-screen">
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
      </div> */}
      <div className="max-w-sm mx-auto animate-fade-up animate-ease-out">
        {animes.map((anime: any, index: number) => (
          <div key={anime.id} className="flex justify-center mx-2 my-4 ">
            <div className="">
              <Link href={`/anime/${anime.id}`}>
                <div className="relative h-48 w-32 mx-auto  rounded-lg">
                  <Image
                    src={anime.main_picture}
                    objectFit="cover"
                    fill={true}
                    alt={anime.title}
                    className=" object-cover rounded-xl hover:opacity-80"
                  ></Image>
                </div>
              </Link>
            </div>
            <div className="flex flex-col justify-between px-4 w-full">
              <div>
                <Link href={`/anime/${anime.id}`}>
                  <div className="font-bold hover:underline">
                    {index + 1}.{anime.title}
                  </div>
                </Link>
                <div>Rating : {anime.rating}/10</div>
                <Ratings size={20} rating={anime.rating / 2} variant="yellow" />
              </div>
              <div className="text-gray-600 pb-2">
                {anime.genre.map((genre: any, index: number) => (
                  <div key={genre.id} className="inline-block">
                    {genre.genrename}
                    {index !== anime.genre.length - 1 && (
                      <span className="pr-2"> · </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
        <div className="h-[5rem]"></div>
      </div>
    </div>
  );
}
