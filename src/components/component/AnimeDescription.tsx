"use client";
import { useState } from "react";

export function AnimeDescription({ description }: any) {
  const [showMore, setShowMore] = useState(false);

  const handleShowMore = () => {
    setShowMore(!showMore);
  };

  return (
    <>
      <div className="indent-8 text-sm text-justify">
        {showMore ? (
          <div className="line-clamp-4">{description}</div>
        ) : (
          <div>{description}</div>
        )}
      </div>
      <button
        onClick={handleShowMore}
        className="hover:underline text-xs text-blue-500 hover:text-blue-700"
      >
        <div>Show more</div>
      </button>
    </>
  );
}
