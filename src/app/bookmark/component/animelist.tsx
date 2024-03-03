"use client";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";
import Card from "@/components/component/card";
export default function Animelist(data: { uid: any }) {
  const supabase = createClient();
  const [anime, setAnime] = useState<any>([]);
  const fetchAnime = async () => {
    let { data: anime, error } = await supabase
      .from("bookmarks")
      .select("anime_id , anime(*)")
      .eq("user_id", data.uid);
    setAnime(anime);
    console.log(anime);
  };
  useEffect(() => {
    fetchAnime();
  }, []);
  return (
    <div className="w-screen h-fit">
      <div className="overflow-y-auto h-full">
        {anime &&
          anime.map((a: any, index: any) =>
            index % 2 != 0 ? null : (
              <div
                key={a.id}
                className="flex w-screen justify-evenly my-2 max-w-screen"
              >
                <Card key={a.anime.id} anime={a.anime}></Card>
                {anime[index + 1] ? (
                  <Card
                    key={anime[index + 1].anime.id}
                    anime={anime[index + 1].anime}
                  ></Card>
                ) : null}
              </div>
            )
          )}
      </div>
      <div className="h-[4rem]"></div>
    </div>
  );
}
