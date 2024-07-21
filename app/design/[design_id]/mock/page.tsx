import { ElementProvider } from "@/components/react-konva/element/state";
import { Editor } from "./MockupEditor";
import { SelectionProvider } from "@/components/react-konva/selection/state";

// const initialStructure: KonvaStructure = {
//   version: "0.1.1",
//   layers: [],
//   artboards: [],
// };

export default async function MockEditorPage() {
  return (
    <div className="fixed inset-0 overflow-hidden">
      <ElementProvider>
        <SelectionProvider>
          <Editor />
        </SelectionProvider>
      </ElementProvider>
    </div>
  );
}
