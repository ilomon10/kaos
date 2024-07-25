import { Editor } from "@/components/react-konva/editor";
import { Editor as Viewport } from "./editor";
import { TextElement } from "@/components/Editor/nodes/Text";

const DesignEditor = () => {
  return (
    <div className="fixed inset-0 overflow-hidden">
      <Editor resolver={{ TextElement }}>
        <Viewport />
      </Editor>
    </div>
  );
};

export default DesignEditor;
