"use client";

import { ActionIcon, Modal } from "@mantine/core";
import { Overlay } from "./Overlay";
import { CaseSensitiveIcon } from "lucide-react";
import { useDisclosure } from "@mantine/hooks";
import { Toolbar } from "./Toolbar";
import { initialState, TypographyProvider, useTypographyState } from "./state";
import { useKonvaContext } from "@/components/react-konva/hooks";
import { generateID } from "@/utils/common/generateID";
import { Layer, Shape } from "@/components/react-konva/element/types";
import Konva from "konva";
import React from "react";
import { TypographyState } from "./types";

const TypogaphyActionWrapper = () => {
  const [opened, { toggle }] = useDisclosure(false);

  const konvaCtx = useKonvaContext();
  const { text, style } = useTypographyState();

  const handleSubmit = () => {
    toggle();
    console.log(konvaCtx._stage.ref);
    const stage = konvaCtx._stage.ref;
    const artboardId = Object.keys(konvaCtx.elements.artboards)[0];
    const artboard = (stage?.findOne(`#${artboardId}`) as Konva.Group).findOne(
      ".artboard-board"
    ) as Konva.Rect;

    const object: Shape<"text"> = {
      id: `object-${generateID()}`,
      type: "text",
      config: {
        ...style,
        text,
        width: 300,
        x: artboard.width() / 2 - 300 / 2,
        y: artboard.height() / 2,
      },
      data: {},
    };
    const layer: Layer = {
      id: `layer-${generateID()}`,
      name: text,
      children: [object.id],
    };
    konvaCtx.helper.addObject(object);
    konvaCtx.helper.addLayer(layer);
    konvaCtx.helper.addChildToArtboard(artboardId, layer.id);
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
