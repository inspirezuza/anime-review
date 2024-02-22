import { createClient } from "@supabase/supabase-js";

export default function Card({ anime }: { anime: any }) {
  let genre: string[] = [];
  return (
    <div className="w-[10rem] h-[22rem]  rounded-md">
      <div className="flex flex-wrap gap-7 w-full max-w-screen overflow-auto my-[20px]">
        <div
          key={anime.id}
          className="w-[10rem] h-[20rem] bg-gray-800 rounded-lg shadow-lg"
        >
          <img
            src={anime.main_picture}
            alt={anime.title}
            className="w-full h-[12rem] object-cover rounded-t-lg"
          />
          <div className="p-3 h-[6rem]">
            <h1 className="text-sm font-bold text-white">{anime.title}</h1>
            <p className="text-sm text-gray-300">{anime.broadcastday}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
