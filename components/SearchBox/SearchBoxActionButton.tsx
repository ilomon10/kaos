"use client";

import { ActionIcon, Autocomplete, Drawer, Input } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { SearchIcon } from "lucide-react";
import React from "react";
import { Header } from "../Header";
import { SearchBoxPage } from "./SearchBoxPage";

export const SearchBoxActionButton = () => {
  const [opened, { toggle }] = useDisclosure(false);
  return (
    <>
      <ActionIcon variant="subtle" color="black" onClick={toggle}>
        <SearchIcon size={22} />
      </ActionIcon>
      <Drawer.Root
        position="bottom"
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
