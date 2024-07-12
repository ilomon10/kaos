"use client";

import { ActionIcon, Autocomplete, Drawer, Input } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { MenuIcon } from "lucide-react";
import React from "react";
import { Header } from "../Header";
import { MainMenuPage } from "./MainMenuPage";

export const MainMenuButton = () => {
  const [opened, { toggle }] = useDisclosure(false);
  return (
    <>
      <ActionIcon variant="subtle" color="black" onClick={toggle}>
        <MenuIcon size={22} />
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
          <MainMenuPage onClose={() => toggle()} />
        </Drawer.Content>
      </Drawer.Root>
    </>
  );
};
