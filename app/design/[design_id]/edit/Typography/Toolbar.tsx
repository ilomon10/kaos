"use client";

import React from "react";
import { useKonvaContext } from "@/components/react-konva/hooks";
import { ActionIcon, Group, Button, Box, ColorSwatch } from "@mantine/core";
import {
  AlignCenterIcon,
  AlignLeftIcon,
  AlignRightIcon,
  SquareParkingIcon,
} from "lucide-react";
import { useTypographyDispatch, useTypographyState } from "./state";
import { TypographyState } from "./types";

type ToolbarProps = {
  onClose?: () => void;
  onSubmit?: (value: TypographyState) => void;
};

const ALIGN_ICON = [
  {
    value: "left",
    icon: AlignLeftIcon,
  },
  {
    value: "center",
    icon: AlignCenterIcon,
  },
  {
    value: "right",
    icon: AlignRightIcon,
  },
];

export const Toolbar: React.FC<ToolbarProps> = ({ onSubmit, onClose }) => {
  // const konvaCtx = useKonvaContext();
  const { text, style } = useTypographyState();
  const dispatch = useTypographyDispatch();

  const handleSubmit = () => {
    onSubmit?.({ text, style });
  };

  return (
    <Box className="fixed top-0 left-0 right-0 z-10 px-3 py-4">
      <Group className="absolute left-0 px-3">
        <Button
          variant="subtle"
          color="white"
          radius={"xl"}
          size="compact-sm"
          ml={-4}
          h={34}
          onClick={handleSubmit}
          className="pointer-events-auto"
        >
          Done
        </Button>
      </Group>
      <Group justify="center" gap="xs">
        <ActionIcon
          variant="filled"
          color="gray"
          radius={"xl"}
          size={"lg"}
          className="pointer-events-auto"
          onClick={() => {
            let idx =
              ALIGN_ICON.findIndex(({ value }) => value === style.align) + 1;

            if (idx >= ALIGN_ICON.length || idx === -1) {
              idx = 0;
            }
            dispatch({
              type: "SET_STYLE",
              style: {
                ...style,
                align: ALIGN_ICON[idx].value,
              },
            });
          }}
        >
          {style.align === "left" && <AlignLeftIcon size={22} />}
          {style.align === "center" && <AlignCenterIcon size={22} />}
          {style.align === "right" && <AlignRightIcon size={22} />}
        </ActionIcon>
        <ActionIcon
          variant="filled"
          color="gray"
          radius={"xl"}
          size={"lg"}
          className="pointer-events-auto"
        >
          <SquareParkingIcon size={22} />
        </ActionIcon>
      </Group>
      <Group className="absolute top-0 right-0 px-3 py-4">
        <ActionIcon
          variant="filled"
          bg="white"
          radius={"xl"}
          size={"lg"}
          className="pointer-events-auto"
        >
          <ColorSwatch color="red" size={22} />
        </ActionIcon>
      </Group>
    </Box>
  );
};
