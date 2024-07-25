"use client";

import React from "react";
import { Toolbar } from "./toolbar";
import { Button, Flex } from "@mantine/core";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { Viewport } from "./Viewport";
import { useResizeObserver } from "@mantine/hooks";

export const Editor = () => {
  const [containerRef, { height, width }] = useResizeObserver();

  return (
    <div
      ref={containerRef}
      style={{
        width: "100%",
        height: "100%",
      }}
    >
      <Toolbar />
      <Viewport height={height} width={width} />
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
