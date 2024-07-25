"use client";

import { generateID } from "@/utils/common/generateID";
import { View } from "lucide-react";
import React from "react";
import useImage from "use-image";

interface ViewportProps {
  width?: number;
  height?: number;
}

export const Canvas: React.FC<ViewportProps> = ({
  width = 100,
  height = 100,
}) => {

  return <div />;
};
