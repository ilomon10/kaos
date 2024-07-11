import { CanvasProvider } from "@/components/react-fabric/Provider";
import { Editor } from "./editor";

const DesignEditor = () => {
  return (
    <div className="fixed inset-0">
      <CanvasProvider>
        <Editor />
      </CanvasProvider>
    </div>
  );
};

export default DesignEditor;
