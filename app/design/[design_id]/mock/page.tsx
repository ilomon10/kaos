import { KonvaProvider } from "@/components/react-konva/state";
import { Editor } from "./MockupEditor";

// const initialStructure: KonvaStructure = {
//   version: "0.1.1",
//   layers: [],
//   artboards: [],
// };

export default async function MockEditorPage() {
  return (
    <div className="fixed inset-0 overflow-hidden">
      <KonvaProvider>
        <Editor />
      </KonvaProvider>
    </div>
  );
}
