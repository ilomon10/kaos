"use client";

import { Flex, ActionIcon, Group } from "@mantine/core";
import {
  CaseSensitiveIcon,
  DownloadIcon,
  SquareIcon,
  XIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";

export const Toolbar = () => {
  const router = useRouter();
  return (
    <Group
      className="fixed top-0 left-0 right-0 z-10 px-3 py-4"
      justify={"space-between"}
    >
      <Group>
        <ActionIcon
          variant="subtle"
          onClick={() => {
            router.back();
          }}
          c="white"
        >
          <XIcon size={24} filter="drop-shadow(0px 0px 2px rgb(0 0 0 / 0.4))" />
        </ActionIcon>
      </Group>
      <Group>
        <ActionIcon variant="subtle" c="white">
          <DownloadIcon filter="drop-shadow(0px 0px 2px rgb(0 0 0 / 0.4))" />
        </ActionIcon>
        <ActionIcon variant="subtle" c="white">
          <SquareIcon filter="drop-shadow(0px 0px 2px rgb(0 0 0 / 0.4))" />
        </ActionIcon>
        <ActionIcon variant="subtle" c="white">
          <CaseSensitiveIcon filter="drop-shadow(0px 0px 2px rgb(0 0 0 / 0.4))" />
        </ActionIcon>
      </Group>
    </Group>
  );
};
