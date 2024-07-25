"use client";

import { ActionIcon, Modal } from "@mantine/core";
import { Overlay } from "./Overlay";
import { CaseSensitiveIcon } from "lucide-react";
import { useDisclosure } from "@mantine/hooks";
import { Toolbar } from "./Toolbar";
import { initialState, TypographyProvider, useTypographyState } from "./state";
import { generateID } from "@/utils/common/generateID";
import Konva from "konva";
import React from "react";
import { TypographyState } from "./types";

const TypogaphyActionWrapper = () => {
  const [opened, { toggle }] = useDisclosure(false);

  const { text, style } = useTypographyState();

  const handleSubmit = () => {
    toggle();
  };

  return (
    <>
      <ActionIcon
        variant="filled"
        color="gray"
        radius={"xl"}
        size={"lg"}
        onClick={() => toggle()}
      >
        <CaseSensitiveIcon size={22} />
      </ActionIcon>
      <Modal.Root opened={opened} onClose={toggle} fullScreen autoFocus={false}>
        <Modal.Overlay />
        <Modal.Content
          style={{ backgroundColor: "transparent", pointerEvents: "none" }}
        >
          <Toolbar onSubmit={handleSubmit} />
          <Overlay />
        </Modal.Content>
      </Modal.Root>
    </>
  );
};

export const TypographyActionButton: React.FC<{
  initialValue?: TypographyState;
}> = ({ initialValue }) => {
  return (
    <TypographyProvider initialValue={initialValue}>
      <TypogaphyActionWrapper />
    </TypographyProvider>
  );
};
