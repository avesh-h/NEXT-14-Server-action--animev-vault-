"use client";

//in this we use hook so we need to convert in to client component

import Image from "next/image";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";
import { fetchAnime } from "@/app/action";
import AnimeCard, { AnimeProp } from "./AnimeCard";

let page = 2;

export type AnimeCard = JSX.Element;

function LoadMore() {
  const { ref, inView } = useInView();
  const [data, setData] = useState<AnimeCard[]>([]);

  //we call the same server action here and in the client component and when it called the request here is always the POST call go and see in network tab , but when we use same call in home page you can see it shows the GET call.

  useEffect(() => {
    if (inView) {
      (async () => {
        const res = await fetchAnime(page);
        setData([...data, ...res]);
        page++;
      })();
    }
  }, [inView, data]);

  return (
    <>
      <section className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10">
        {data}
      </section>
      <section className="flex justify-center items-center w-full">
        <div ref={ref}>
          <Image
            src="./spinner.svg"
            alt="spinner"
            width={56}
            height={56}
            className="object-contain"
          />
        </div>
      </section>
    </>
  );
}

export default LoadMore;
