"use client";
import { Tabs, Tab, Switch } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import Card from "./component/card";

export default function Home() {
  const [day, setDay] = useState<string>("monday");
  const [anime, setAnime] = useState<any>([]);
  const [nsfw, setNSFW] = useState<boolean>(false);

  const fetchAnime = async () => {
    const supabase = createClient(
      "https://ljalvqncjekbwpdnzaby.supabase.co",
      process.env.NEXT_PUBLIC_SUPABASE_KEY as string
    );
    if (nsfw) {
      let { data: anime, error } = await supabase
        .from("anime")
        .select("*")
        .like("broadcastday", day);
      setAnime(anime);
    } else {
      let { data: anime, error } = await supabase
        .from("anime")
        .select("*")
        .like("broadcastday", day)
        .eq("SFW", true);
      setAnime(anime);
    }
    console.log(anime);
  };

  useEffect(() => {
    fetchAnime();
  }, [day, nsfw]);

  return (
    <div className="w-screen h-screen overflow-hidden bg-black">
      <div className="w-screen my-1 px-2 flex justify-end">
        <Switch isSelected={nsfw} onValueChange={setNSFW} color="danger">
          <p className="text-primary">NSFW</p>
        </Switch>
      </div>
      <div className="flex justify-center">
        <div className="w-[22rem]">
          <div className="flex flex-wrap gap-7 w-full max-w-screen overflow-auto my-[1rem]">
            <Tabs
              selectedKey={day}
              onSelectionChange={(key) => setDay(key as string)}
              aria-label="Tabs colors"
              variant="solid"
              radius="none"
            >
              <Tab key="%" title="All" />
              <Tab key="monday" title="Monday" />
              <Tab key="tuesday" title="Tuesday" />
              <Tab key="wednesday" title="Wednesday" />
              <Tab key="thursday" title="Thursday" />
              <Tab key="friday" title="Friday" />
              <Tab key="saturday" title="Saturday" />
              <Tab key="sunday" title="Sunday" />
            </Tabs>
          </div>
        </div>
      </div>
      <div className="h-full overflow-auto">
        {anime.map((a: any, index: any) =>
          index % 2 != 0 ? null : (
            <div className="flex w-screen justify-evenly">
              <Card key={a.id} anime={a}></Card>
              {anime[index + 1] ? (
                <Card key={anime[index + 1].id} anime={anime[index + 1]}></Card>
              ) : null}
            </div>
          )
        )}
      </div>
    </div>
  );
}
