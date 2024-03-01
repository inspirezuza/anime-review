"use client";
import { CarouselPlugin } from "@/components/component/CarouselPlugin";
import Carousel from "../components/component/Carousel";
export default function Home() {
  return (
    <div className="w-screen">
      <div>
        <CarouselPlugin />
        <Carousel />
      </div>
    </div>
  );
}
