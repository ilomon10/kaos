import { useKonvaContext } from "@/components/react-konva/hooks";

export const Settings = () => {
  const konvaCtx = useKonvaContext();
  const selectedObjects = konvaCtx.helper.getSelectedElements();
  return <div>Settings</div>;
};
