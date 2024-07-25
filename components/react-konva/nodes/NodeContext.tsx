import React from "react";
import { NodeId } from "../interfaces/nodes";

export type NodeContextType = {
  id: NodeId;
  related?: boolean;
};

export const NodeContext = React.createContext<NodeContextType>(null as any);

export type NodeProviderProps = Omit<NodeContextType, "connectors"> & {
  children?: React.ReactNode;
};

export const NodeProvider = ({
  id,
  related = false,
  children,
}: NodeProviderProps) => {
  return (
    <NodeContext.Provider value={{ id, related }}>
      {children}
    </NodeContext.Provider>
  );
};
