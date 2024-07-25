import { NodeHelpers } from "../editor";
import { useInternalEditor } from "../editor/useInternalEditor";
import { useInternalNode } from "../nodes/useInternalNode";

export function useNode() {
  const ctx = useInternalNode();
  const editor = useInternalEditor();
  const helpers = NodeHelpers(editor.context.state, ctx.id);

  return {
    ...ctx,
    ...helpers,
  };
}
