import { Editor } from "./editor";
import { ElementProvider } from "@/components/react-konva/element/state";
import { SelectionProvider } from "@/components/react-konva/selection/state";

const DesignEditor = () => {
  return (
    <div className="fixed inset-0 overflow-hidden">
      <ElementProvider>
        <SelectionProvider>
          <Editor />
        </SelectionProvider>
      </ElementProvider>
    </div>
  );
};

export default DesignEditor;
