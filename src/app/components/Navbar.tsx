import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
} from "@nextui-org/react";
import { IoMdHome, IoMdSearch } from "react-icons/io";
import { FaUser } from "react-icons/fa";

import React from "react";

export default function Bottomnavbar() {
  return (
    <div className="w-screen flex justify-center fixed bottom-0">
      <div className="">
        <Navbar isBordered classNames={{ item: ["flex", "rounded-sm"] }}>
          <NavbarContent>
            <NavbarContent justify="center" className="gap-4 flex">
              <NavbarItem>
                <Link color="foreground" href="/">
                  <IoMdHome />
                </Link>
              </NavbarItem>
              <NavbarItem>
                <Link color="foreground" href="/">
                  <IoMdSearch />
                </Link>
              </NavbarItem>
              <NavbarItem>
                <Link color="foreground" href="/login">
                  <FaUser size={14} />
                </Link>
              </NavbarItem>
            </NavbarContent>
          </NavbarContent>
        </Navbar>
      </div>
    </div>
  );
}
