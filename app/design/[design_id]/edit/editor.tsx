"use client";

import { Canvas } from "@/components/react-fabric/Canvas";
import React from "react";
import { Toolbar } from "./toolbar";
import { Button, Flex } from "@mantine/core";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { useCanvasContext } from "@/components/react-fabric/Provider";
import { generateID } from "@/utils/common/generateID";

export const Editor = () => {
  const { canvas, addArtboard } = useCanvasContext();

  React.useEffect(() => {
    if (!canvas) return;

    const artboardSize = {
      height: canvas.height * 0.7,
      width: canvas.width * 0.7,
    };

    addArtboard(generateID(), {
      title: "Main",
      rectOptions: {
        backgroundColor: "white",
        top: canvas.height / 2 - artboardSize.height / 2,
        left: canvas.width / 2 - artboardSize.width / 2,
        width: artboardSize.width,
        height: artboardSize.height,
      },
    });
  }, [canvas]);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
      }}
    >
      <Toolbar />
      <Canvas
        fabricCanvasProps={{
          backgroundColor: "#ddd",
        }}
        responsive={true}
        onReady={function (canvas) {
          console.log(canvas);
        }}
      />
      <Flex
        className="fixed bottom-0 left-0 right-0 px-3 py-4"
        justify={"space-between"}
      >
        <div></div>
        <div>
          <Button
            variant="default"
            component={Link}
            href={"/design/101/mock"}
            radius={"xl"}
            rightSection={<ChevronRight />}
          >
            Next
          </Button>
        </div>
      </Flex>
    </div>
  );
};
