import { Input, Textarea } from "@mantine/core";
import { useFocusTrap } from "@mantine/hooks";
import React from "react";
import { useTypographyDispatch, useTypographyState } from "./state";

export const Overlay: React.FC = () => {
  const inputRef = React.useRef<HTMLTextAreaElement>(null);

  const { text, style } = useTypographyState();
  const dispatch = useTypographyDispatch();

  const handleChange: React.ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    dispatch({ type: "SET_TEXT", text: e.target.value });
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center">
      <Textarea
        ref={inputRef}
        unstyled={true}
        autosize={true}
        autoFocus={true}
        data-autofocus
        value={text}
        onChange={handleChange}
        w={"full"}
        placeholder="Add Text"
        styles={{
          root: {
            pointerEvents: "all",
          },
          input: {
            color: style.fill,
            fontFamily: style.fontFamily,
            fontSize: style.fontSize,
            textAlign: style.align as CanvasTextAlign,
            
            outline: "unset",
            backgroundColor: "transparent",
          },
        }}
      />
    </div>
  );
};
