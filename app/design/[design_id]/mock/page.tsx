import { CanvasProvider } from "@/components/react-fabric/Provider";
import { Editor } from "./MockupEditor";

export default async function MockEditorPage() {
  return (
    <div className="fixed inset-0">
      <CanvasProvider>
        <Editor />
      </CanvasProvider>
    </div>
  );
}
