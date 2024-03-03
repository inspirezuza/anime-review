import AnimeComments from "@/components/component/AnimeComments";
import { AnimeDescription } from "@/components/component/AnimeDescription";
import NewComment from "@/components/component/NewComment";
import { Ratings } from "@/components/component/Ratings";
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/server";
import { unstable_cache } from "next/cache";
import Bookbutton from "./component/bookbutton";

import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";

import { FaBookBookmark } from "react-icons/fa6";
import { FaSquareUpRight } from "react-icons/fa6";

import dynamic from "next/dynamic";
const SwitchTheme = dynamic(
  () => import("@/components/component/switchtheme"),
  {
    ssr: false,
  }
);

function extractVideoId(url: string): string | null {
  const regex = /[?&]([^=#]+)=([^&#]*)/g;
  let match;
  let videoId = null;

  while ((match = regex.exec(url)) !== null) {
    if (match[1] === "v") {
      videoId = match[2];
      break;
    }
  }

  return videoId;
}

export default async function Page({ params }: { params: { slug: string } }) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const fetchAnime = async () => {
    let { data: anime, error: animeError } = await supabase
      .from("anime")
      .select(
        `*,anime-studio(anime_id,studio_id),studio!inner(id,studioname),
        anime-genre(anime_id,Genre_id),genre!inner(id,genrename)`
      )
      .eq("id", params.slug);
    if (!animeError) {
      return anime;
    } else {
      console.log("error", animeError);
    }
  };
  const getCachedAnime = unstable_cache(
    fetchAnime,
    [params.slug], // You can adjust the keyParts as needed
    { revalidate: 3600 } // Cache for 1 hour (3600 seconds)
  );

  const anime = (await getCachedAnime()) as any;

  let { data: bookmarkstatus } = (await supabase
    .from("bookmarks")
    .select("*")
    .eq("anime_id", params.slug)
    .eq("user_id", user?.id)) as any;

  let { data: rawcomments, error: commentError } = await supabase
    .from("comments")
    .select("*, author: profiles(*), likes(*)")
    .order("created_at", { ascending: false })
    .eq("anime_id", params.slug)
    .range(0, 9);

  const comments =
    rawcomments?.map((comment) => ({
      ...comment,
      author: Array.isArray(comment.author)
        ? comment.author[0]
        : comment.author,
      user_has_liked_comment:
        (comment.likes &&
          Array.isArray(comment.likes) &&
          comment.likes.some((like: any) => like.user_id === user?.id)) ||
        false,
      likes:
        comment.likes && Array.isArray(comment.likes)
          ? comment.likes.length
          : 0,
      isAuthor: comment.author.id === user?.id,
    })) ?? [];

  return (
    <>
      <div className="absolute top-4 right-1">
        <SwitchTheme />
      </div>
      <div className={`mx-auto max-w-md h-[60vh] w-full`}>
        {/* <div className=" backdrop-blur-md bg-black/30"></div> */}
        <div className="flex flex-col justify-center items-center w-full p-4 pt-16 ">
          <div className="relative h-48 w-32 mx-auto rounded-lg">
            <Image
              src={anime?.[0].main_picture}
              fill={true}
              alt={anime?.[0].title}
              className="object-cover rounded-xl"
              sizes="(max-width: 128px) 100vw, (max-width: 192px) 50vw, 33vw"
            />
          </div>
          <h1 className="text-lg font-bold pt-2 text-center max-w-xs">
            {anime?.[0].title}
          </h1>
          <div className="font-semibold text-xs pb-2">
            {anime?.[0].studio[0].studioname}
          </div>
          <Ratings size={20} rating={anime?.[0].rating / 2} variant="yellow" />
          {/* <p>{anime?.[0].url}</p> */}
          <div className="flex gap-1 pt-2">
            {anime?.[0].genre.map((genre: any, index: number) => (
              <div key={genre.id} className="text-xs inline-block">
                {genre.genrename}
                {index !== anime?.[0].genre.length - 1 && (
                  <span className=""> ·</span>
                )}
              </div>
            ))}
          </div>
          <div className="flex gap-2 pt-4">
            <Link href={anime?.[0].url} target="_blank">
              <Button variant="outline">
                <div className="flex gap-0 justify-center items-center">
                  <FaSquareUpRight />
                  <div className="pb-1 pl-1"> Watch more</div>
                </div>
              </Button>
            </Link>
            {bookmarkstatus ? (
              <Bookbutton
                bookmarkstatus={bookmarkstatus.length}
                anime_id={params.slug}
                user_id={user?.id}
              />
            ) : (
              <Link href={"/login"}>
                <Button variant={"outline"}>
                  <div className="flex gap-0 justify-center items-center">
                    <FaBookBookmark />
                    <div className="pb-1 pl-1">BookMark</div>
                  </div>
                </Button>
              </Link>
            )}
          </div>
        </div>

        <div className="border-b-2"></div>
        <div className="p-4">
          <div className="text-lg font-bold">Description</div>
          <AnimeDescription description={anime?.[0].description} />

          {anime?.[0].TrailerURL ? (
            <div>
              <div className="text-lg font-bold pt-4">Trailer</div>
              <div className="w-full">
                <iframe
                  src={`https://www.youtube.com/embed/${extractVideoId(
                    anime?.[0].TrailerURL
                  )}`}
                  className="w-full h-60 "
                />
              </div>
            </div>
          ) : (
            <div></div>
          )}
        </div>
        <div className="p-4">
          <div className=" text-lg font-bold pt-4 pb-2">Comment</div>
          <NewComment anime_id={params.slug} />
        </div>
        <div className="pt-4 px-0 border-b-2"></div>
        <AnimeComments comments={comments} />
        <div className="pt-24"></div>
      </div>
    </>
  );
}
