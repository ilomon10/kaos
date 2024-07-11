"use client";

import { Flex, ActionIcon, Group } from "@mantine/core";
import {
  ArrowLeftIcon,
  CaseSensitiveIcon,
  DownloadIcon,
  SquareIcon,
  XIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";

export const Toolbar = () => {
  const router = useRouter();
  return (
    <Flex
      className="fixed top-0 left-0 right-0 z-10 px-3 py-4"
      justify={"space-between"}
    >
      <div>
        <ActionIcon
          variant="subtle"
          onClick={() => {
            router.back();
          }}
        >
          <ArrowLeftIcon size={24} />
        </ActionIcon>
      </div>
      <Group>
        <ActionIcon variant="subtle">
          <DownloadIcon />
        </ActionIcon>
      </Group>
    </Flex>
  );
};
