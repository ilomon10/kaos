"use client";

import React from "react";

import { useInternalEditor } from "../editor/useInternalEditor";
import { useInternalNode } from "../nodes/useInternalNode";
import { DefaultRender } from "./DefaultRender";

type RenderNodeToElementProps = {
  render?: React.ReactElement;
  children?: React.ReactNode;
};
export const RenderNodeToElement = ({ render }: RenderNodeToElementProps) => {
  const {
    options: { onRender },
  } = useInternalEditor();

  return React.createElement(onRender, { render: render || <DefaultRender /> });
};
