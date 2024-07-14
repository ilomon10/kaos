import { Editor } from "./MockupEditor";
import { KonvaStructure } from "@/components/react-konva/types";
import { KonvaProvider } from "@/components/react-konva/KonvaContext";

const initialStructure: KonvaStructure = {
  version: "0.1.1",
  layers: [],
  artboards: [],
};

export default async function MockEditorPage() {
  return (
    <div className="fixed inset-0">
      <KonvaProvider initialStructure={initialStructure}>
        <Editor />
      </KonvaProvider>
    </div>
  );
}
