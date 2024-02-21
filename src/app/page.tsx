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
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

import Card from "./component/card";
const supabase = createClient(
  "https://ljalvqncjekbwpdnzaby.supabase.co",
  process.env.NEXT_PUBLIC_SUPABASE_KEY as string
);
export default function Home() {
  const [day, setDay] = useState<string>("monday");
  const [genre, setGenre] = useState<any>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [searchtext, setSearchText] = useState<string>("");
  const [showmodal, setShowmodal] = useState<boolean>(false);
  const [anime, setAnime] = useState<any>([]);
  const [nsfw, setNSFW] = useState<boolean>(false);

  const fetchAnime = async () => {
    if (nsfw) {
      let { data: anime, error } = await supabase
        .from("anime")
        .select("*")
        .ilike("title", "%" + searchtext + "%")
        .like("broadcastday", day);
      setAnime(anime);
    } else {
      let { data: anime, error } = await supabase
        .from("anime")
        .select("*")
        .ilike("title", "%" + searchtext + "%")
        .eq("SFW", true)
        .like("broadcastday", day);
      setAnime(anime);
    }
  };

  const fetchGenre = async () => {
    let { data: d, error } = await supabase.from("anime-genre").select("*");
    console.log(d);
    setGenre(d);
    console.log(genre);
  };

  useEffect(() => {
    fetchAnime();
    fetchGenre();
  }, [day, nsfw, searchtext]);
  return (
    <>
      <div className="w-screen h-screen overflow-hidden bg-black">
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
                onValueChange={setSearchText}
                startContent={<IoIosSearch />}
              />
            </div>
          </div>
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
              <div className="flex w-screen justify-evenly h-fit">
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
        </div>
      </div>
      <Modal
        size="lg"
        isOpen={isOpen}
        onClose={onClose}
        disableAnimation={true}
        placement="center"
        backdrop="blur"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalBody>
                <Switch
                  isSelected={nsfw}
                  onValueChange={setNSFW}
                  color="danger"
                >
                  <p className="text-primary">NSFW</p>
                </Switch>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Done
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
