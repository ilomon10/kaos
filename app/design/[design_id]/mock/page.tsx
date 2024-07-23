import { ElementProvider } from "@/components/react-konva/element/state";
import { Editor } from "./MockupEditor";
import { SelectionProvider } from "@/components/react-konva/selection/state";

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
