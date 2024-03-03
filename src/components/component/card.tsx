import { createClient } from "@supabase/supabase-js";
import Image from "next/image";
import Link from "next/link";

export default function Card({ anime }: { anime: any }) {
  return (
    <Link href={`anime/${anime.id}`}>
      <div className="w-[10rem] rounded-md">
        <div className="w-[10rem] bg-gray-800 rounded-lg shadow-lg overflow-hidden h-[20rem]">
          <Image
            src={anime.main_picture}
            alt={anime.title}
            width={100}
            height={200}
            layout="responsive"
            className="object-cover w-full h-40"
          />
          <div className="p-3">
            <h1 className="text-sm font-bold text-white">{anime.title}</h1>
            <p className="text-sm text-gray-300">{anime.broadcastday}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}
