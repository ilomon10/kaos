import React from "react";
import { EventHandlerContext } from "./EventContext";
import { useInternalEditor } from "./useInternalEditor";
import { DefaultEventHandler } from "./DefaultEventHandler";

export const Events: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { context } = useInternalEditor();

  const handler = React.useMemo(() => DefaultEventHandler(context), [context]);
  if (!handler) {
    return null;
  }

  return (
    <EventHandlerContext.Provider value={handler}>
      {children}
    </EventHandlerContext.Provider>
  );
};
