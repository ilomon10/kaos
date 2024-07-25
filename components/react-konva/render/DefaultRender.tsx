"use client";

import React, { useMemo } from "react";

import { NodeId } from "../interfaces";
import { NodeElement } from "../nodes";
import { useInternalNode } from "../nodes/useInternalNode";

export const DefaultRender = () => {
  const {
    type,
    data: { props, nodes },
    __hydrationTimestamp,
  } = useInternalNode();

  return useMemo(() => {
    let children = props.children;

    if (nodes && nodes.length > 0) {
      children = (
        <React.Fragment>
          {nodes.map((id: NodeId) => (
            <NodeElement id={id} key={id} />
          ))}
        </React.Fragment>
      );
    }

    const render = React.createElement(type, props, children);

    return render;
    // eslint-disable-next-line  react-hooks/exhaustive-deps
  }, [props, __hydrationTimestamp, nodes]);
};
