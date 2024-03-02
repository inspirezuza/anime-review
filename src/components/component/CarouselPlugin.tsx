import * as React from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import Image from "next/image";
import Link from "next/link";

export function CarouselPlugin({ animes }: any) {
  const novelcount = animes.length;
  console.log(novelcount);

  return (
    <Carousel className="" opts={{ align: "center", loop: true }}>
      <CarouselContent>
        {/* {Array.from({ length: novelcount }).map((_, index) => ( */}
        {animes.map((anime: any, index: number) => (
          <CarouselItem key={index} className="pl-2 basis-1/2">
            <div>
              <Link href={`/anime/${anime.id}`}>
                <div className="relative h-64 w-48 mx-auto">
                  <Image
                    src={anime.main_picture}
                    alt="carousel image"
                    fill={true}
                    className="rounded-xl transition-transform transform hover:opacity-90"
                    priority={true}
                    sizes="(max-width: 192px) 100vw, (max-width: 256px) 50vw, 33vw"
                  />
                </div>
                <div className="line-clamp-2 text-center text-md">
                  {anime.title}
                </div>
              </Link>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      {/* <div className="absolute -bottom-4 left-0 right-0 flex justify-center items-center py-2 text-sm text-muted-foreground">
        {current}/{count}
      </div> */}
      {/* <Progress
        value={(current * 100) / count}
        className="absolute -bottom-5 left-0 right-0 mx-auto w-[50%] md:w-[30%] opacity-20"
      /> */}
      <CarouselPrevious className="left-4 opacity-80" />
      <CarouselNext className="right-4 opacity-80" />
    </Carousel>
  );
}
