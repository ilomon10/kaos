import LayerComponent from "./LayerComponent";
import ObjectComponent from "./ObjectComponent";
import { useKonvaContextState } from "./state";
import { Group } from "./types";

interface GroupComponentProps {
  group: Group;
}

const GroupComponent: React.FC<GroupComponentProps> = ({ group }) => {
  const state = useKonvaContextState();
  return (
    <div className="group">
      <h3>{group.name}</h3>
      {group.children.map((childId) => {
        if (childId in state.layers)
          return <LayerComponent key={childId} layer={state.layers[childId]} />;
        if (childId in state.groups)
          return <GroupComponent key={childId} group={state.groups[childId]} />;
        if (childId in state.objects)
          return (
            <ObjectComponent key={childId} object={state.objects[childId]} />
          );
        return null;
      })}
    </div>
  );
};

export default GroupComponent;
