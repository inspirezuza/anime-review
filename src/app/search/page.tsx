"use client";
import {
  Tabs,
  Tab,
  Switch,
  Input,
  useDisclosure,
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/react";
import { IoIosSearch } from "react-icons/io";
import { GoAlert } from "react-icons/go";
import { useDebouncedCallback } from "use-debounce";
import { useEffect, useState } from "react";
import { Pagination } from "@nextui-org/react";
import Card from "../components/card";
import FilterModal from "../components/filtermodal";
import { createClient } from "@/utils/supabase/client";
// const supabase = createClient(
//   "https://ljalvqncjekbwpdnzaby.supabase.co",
//   process.env.NEXT_PUBLIC_SUPABASE_KEY as string
// );
const supabase = createClient();
export default function Home() {
  const [day, setDay] = useState<string>("monday");
  const [genre, setGenre] = useState<any>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [searchtext, setSearchText] = useState<string>("");
  const [anime, setAnime] = useState<any>([]);
  const [nsfw, setNSFW] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [filters, setFilter] = useState<any>([]);
  const [totalpage, setTotalPage] = useState<number>(1);

  const fetchAnime = async () => {
    if (nsfw) {
      let {
        data: anime,
        error,
        count,
      } = await supabase
        .from("anime")
        .select(
          `*,
        anime-genre(anime_id,Genre_id),genre!inner(id,genrename) `,
          {
            count: "exact",
          }
        )
        .ilike("title", "%" + searchtext + "%")
        .like("broadcastday", day)
        .in(
          "genre.id",
          filters.length != 0 ? filters : Array.from(Array(25).keys())
        )
        .range(10 * (page - 1), 10 * page - 1);
      setAnime(anime);
      setTotalPage(Math.ceil((count as number) / 10));
    } else {
      let {
        data: anime,
        error,
        count,
      } = await supabase
        .from("anime")
        .select(
          `*,
        anime-genre(anime_id,Genre_id),genre!inner(id,genrename) `,
          {
            count: "exact",
          }
        )
        .ilike("title", "%" + searchtext + "%")
        .eq("SFW", true)
        .like("broadcastday", day)
        .in(
          "genre.id",
          filters.length != 0 ? filters : Array.from(Array(25).keys())
        )
        .range(10 * (page - 1), 10 * page - 1);
      setAnime(anime);
      setTotalPage(Math.ceil((count as number) / 10));
    }
  };
  const fetchJoin = async () => {
    let { data: genre, error } = await supabase
      .from("anime")
      .select(
        `*,
    anime-genre(anime_id,Genre_id),genre!inner(id,genrename)`
      )
      .in(
        `genre.id`,
        filters.length != 0 ? filters : Array.from(Array(25).keys())
      )
      .range(0, 10);
  };
  const fetchGenre = async () => {
    let { data: genre, error } = await supabase.from("genre").select("*");
    setGenre(genre);
  };
  const searchAnime = useDebouncedCallback(() => {
    fetchAnime();
  }, 300);
  useEffect(() => {
    fetchAnime();
    fetchGenre();
  }, [day, nsfw, page, filters]);
  const setFilterGenre = (id: number) => {
    if (filters.includes(id)) {
      setFilter(filters.filter((f: number) => f !== id));
    } else setFilter([...filters, id]);
  };
  return (
    <>
      <div className="w-screen bg-black max-w-screen overflow-x-hidden overflow-y-auto">
        <div className="w-screen my-1 px-2 flex justify-end">
          <Button variant="flat" className="capitalize" onPress={onOpen}>
            Filter
          </Button>
        </div>

        <div className="flex justify-center flex-col items-center">
          <div>
            <div className="flex w-full flex-wrap md:flex-nowrap">
              <Input
                isClearable
                type="text"
                value={searchtext}
                onChange={searchAnime}
                onClear={searchAnime}
                onValueChange={setSearchText}
                startContent={<IoIosSearch />}
              />
            </div>
          </div>
          <div className="w-[22rem]">
            <div className="flex flex-wrap gap-3 w-full max-w-screen overflow-auto my-[1rem]">
              <Tabs
                selectedKey={day}
                onSelectionChange={(key) => {
                  setDay(key as string);
                  setPage(1);
                }}
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
        <div className="overflow-y-auto h-full">
          {anime &&
            anime.map((a: any, index: any) =>
              index % 2 != 0 ? null : (
                <div
                  key={a.id}
                  className="flex w-screen justify-evenly my-2 max-w-screen"
                >
                  <Card key={a.id} anime={a}></Card>
                  {anime[index + 1] ? (
                    <Card
                      key={anime[index + 1].id}
                      anime={anime[index + 1]}
                    ></Card>
                  ) : null}
                </div>
              )
            )}
          <div className="flex justify-center w-full mb-[4rem]">
            <Pagination
              isCompact
              showControls
              total={totalpage}
              initialPage={1}
              page={page}
              onChange={setPage}
            />
          </div>
        </div>
      </div>
      <FilterModal
        nsfw={nsfw}
        onClose={onClose}
        isOpen={isOpen}
        setNSFW={setNSFW}
        genres={genre}
        filters={filters}
        setFilter={setFilterGenre}
      ></FilterModal>
    </>
  );
}
