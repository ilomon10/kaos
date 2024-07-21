"use client";

import { useElementContextDispatch } from "./state";
import {
  ElementType,
  ElementTypeMap,
  Artboard,
  Layer,
  Group,
  Shape,
} from "./types";

export function useElementOperations() {
  const dispatch = useElementContextDispatch();

  const addElement = <T extends ElementType>(
    elementType: T,
    element: ElementTypeMap[T]
  ) => {
    dispatch({ type: "ADD_ELEMENT", elementType, payload: element });
  };

  const removeElement = (elementType: ElementType, id: string) => {
    dispatch({ type: "REMOVE_ELEMENT", elementType, id });
  };

  const updateElement = <T extends ElementType>(
    elementType: T,
    id: string,
    updates: Partial<ElementTypeMap[T]>
  ) => {
    dispatch({
      type: "UPDATE_ELEMENT",
      elementType,
      payload: { id, ...updates },
    });
  };

  const addChild = (
    parentType: Exclude<ElementType, "object">,
    parentId: string,
    childId: string
  ) => {
    dispatch({ type: "ADD_CHILD", parentType, parentId, childId });
  };

  const removeChild = (
    parentType: Exclude<ElementType, "object">,
    parentId: string,
    childId: string
  ) => {
    dispatch({ type: "REMOVE_CHILD", parentType, parentId, childId });
  };

  const moveElement = (
    elementType: ElementType,
    elementId: string,
    sourceParentType: Exclude<ElementType, "object">,
    sourceParentId: string,
    targetParentType: Exclude<ElementType, "object">,
    targetParentId: string
  ) => {
    removeChild(sourceParentType, sourceParentId, elementId);
    addChild(targetParentType, targetParentId, elementId);
  };

  return {
    addArtboard: (artboard: Artboard) => addElement("artboard", artboard),
    removeArtboard: (id: string) => removeElement("artboard", id),
    updateArtboard: (id: string, updates: Partial<Artboard>) =>
      updateElement("artboard", id, updates),

    addLayer: (layer: Layer) => addElement("layer", layer),
    removeLayer: (id: string) => removeElement("layer", id),
    updateLayer: (id: string, updates: Partial<Layer>) =>
      updateElement("layer", id, updates),

    addGroup: (group: Group) => addElement("group", group),
    removeGroup: (id: string) => removeElement("group", id),
    updateGroup: (id: string, updates: Partial<Group>) =>
      updateElement("group", id, updates),

    addObject: (object: Shape<any>) => addElement("object", object),
    removeObject: (id: string) => removeElement("object", id),
    updateObject: (id: string, updates: Partial<Shape<any>>) =>
      updateElement("object", id, updates),

    addChildToArtboard: (artboardId: string, childId: string) =>
      addChild("artboard", artboardId, childId),
    removeChildFromArtboard: (artboardId: string, childId: string) =>
      removeChild("artboard", artboardId, childId),

    addChildToGroup: (groupId: string, childId: string) =>
      addChild("group", groupId, childId),
    removeChildFromGroup: (groupId: string, childId: string) =>
      removeChild("group", groupId, childId),

    addChildToLayer: (layerId: string, childId: string) =>
      addChild("layer", layerId, childId),
    removeChildFromLayer: (layerId: string, childId: string) =>
      removeChild("layer", layerId, childId),

    moveElement,
  };
}
