"use client";

import { useNode } from "@/components/react-konva";
import { UserComponent } from "@/components/react-konva/interfaces";
import { Text } from "react-konva";

export const TextElement: UserComponent = () => {
  const {
    data,
    connectors: { connect, select },
  } = useNode();

  console.log(data);

  return (
    <Text
      id={data.id}
      name={data.name}
      ref={(ref) => {
        connect(ref);
        select(ref);
      }}
      x={data.transform.x}
      y={data.transform.y}
      text={data.props.value}
    />
  );
};

TextElement.konva = {
  displayName: "Text",
  props: { value: "COBA" },
  related: {},
};
