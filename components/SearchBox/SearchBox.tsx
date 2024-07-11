"use client";

import { Autocomplete, Drawer, Input } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { SearchIcon } from "lucide-react";
import React from "react";
import { Header } from "../Header";
import { SearchBoxPage } from "./SearchBoxPage";

export const SearchBox = () => {
  const [value, setValue] = React.useState("");
  const [opened, { toggle }] = useDisclosure(false);
  return (
    <>
      <Input
        leftSection={<SearchIcon size={16} />}
        placeholder="Cari di Kaos"
        onClick={() => toggle()}
      />
      <Drawer.Root
        position="left"
        size="xl"
        opened={opened}
        onClose={function () {
          toggle();
        }}
      >
        <Drawer.Overlay />
        <Drawer.Content>
          <SearchBoxPage onClose={() => toggle()} />
        </Drawer.Content>
      </Drawer.Root>
    </>
  );
};
