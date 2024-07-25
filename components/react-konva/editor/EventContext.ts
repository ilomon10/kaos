import { createContext, useContext } from "react";
import { DefaultEventHandler } from "./DefaultEventHandler";

export type EventHandlerContextType = ReturnType<typeof DefaultEventHandler>;

export const EventHandlerContext = createContext<EventHandlerContextType>(
  null as any
);

export const useEventHandler = () => useContext(EventHandlerContext);
