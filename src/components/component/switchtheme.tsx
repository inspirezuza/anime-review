"use client";
import * as React from "react";
import { Switch } from "@nextui-org/react";
import { IoSunnyOutline, IoMoonOutline } from "react-icons/io5";
import { useTheme } from "next-themes";
import { useState } from "react";

export default function SwitchTheme() {
  const { theme, setTheme } = useTheme();
  const [isSelected, setIsSelected] = useState<boolean>(theme === "light");
  return (
    <Switch
      defaultSelected
      size="lg"
      color="default"
      isSelected={isSelected}
      onValueChange={() => {
        setIsSelected(!isSelected);
        setTheme(isSelected ? "dark" : "light");
      }}
      thumbIcon={({ isSelected, className }) =>
        isSelected ? (
          <IoSunnyOutline className={className} />
        ) : (
          <IoMoonOutline className={className} />
        )
      }
    />
  );
}
