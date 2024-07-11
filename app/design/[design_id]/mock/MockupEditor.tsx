"use client";

import { Canvas } from "@/components/react-fabric/Canvas";
import React from "react";
import { Toolbar } from "./toolbar";
import { Button, Flex } from "@mantine/core";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

export const Editor = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
      }}
    >
      <Toolbar />
      <Canvas
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
            component={Link}
            href={"/"}
            radius={"xl"}
            rightSection={<ChevronRight />}
          >
            Order
          </Button>
        </div>
      </Flex>
    </div>
  );
};
