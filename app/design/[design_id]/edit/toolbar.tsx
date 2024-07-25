"use client";

import { Flex, ActionIcon, Group } from "@mantine/core";
import {
  CaseSensitiveIcon,
  CropIcon,
  DownloadIcon,
  Ellipsis,
  SquareIcon,
  StickerIcon,
  XIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { TypographyActionButton } from "./Typography/Button";
import { cx } from "class-variance-authority";
import React from "react";

export const Toolbar = () => {
  const router = useRouter();
  const iconFilterStyle = "drop-shadow(0px 0px 2px rgb(0 0 0 / 0.4))";

  return (
    <Group
      className={"fixed top-0 left-0 right-0 z-10 px-3 py-4"}
      justify={"space-between"}
    >
      <Group>
        <ActionIcon
          variant="filled"
          color="gray"
          radius={"xl"}
          size={"lg"}
          onClick={() => {
            router.back();
          }}
        >
          <XIcon size={22} />
        </ActionIcon>
      </Group>
      <Group>
        <ActionIcon variant="filled" color="gray" radius={"xl"} size={"lg"}>
          <DownloadIcon size={22} />
        </ActionIcon>
        <ActionIcon variant="filled" color="gray" radius={"xl"} size={"lg"}>
          <CropIcon size={22} />
        </ActionIcon>
        <ActionIcon variant="filled" color="gray" radius={"xl"} size={"lg"}>
          <CaseSensitiveIcon size={22} />
        </ActionIcon>
        <ActionIcon variant="filled" color="gray" radius={"xl"} size={"lg"}>
          <StickerIcon size={22} />
        </ActionIcon>
        <ActionIcon variant="filled" color="gray" radius={"xl"} size={"lg"}>
          <Ellipsis size={22} />
        </ActionIcon>
      </Group>
    </Group>
  );
};
