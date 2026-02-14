import type { Dispatch, SetStateAction } from "react";

import { createId } from "@paralleldrive/cuid2";
import { useState } from "react";

import type { DynamicDnDItemType } from "@/types/drag-n-drop";

export type OnDragEndType = (result: any) => void;
export type CreateItemType = (key: string, content: any) => DynamicDnDItemType;

type ReturnType
  = [
    items: DynamicDnDItemType[],
    setItems: Dispatch<SetStateAction<DynamicDnDItemType[]>>,
    createItem: CreateItemType,
    onDragEnd: OnDragEndType,
  ];

function useDnD(): ReturnType {
  const [items, setItems] = useState<DynamicDnDItemType[]>([]);

  const reorder = (list: DynamicDnDItemType[], startIndex: number, endIndex: number) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  const onDragEnd = (result: any) => {
    // dropped outside a droppable area
    if (!result.destination) {
      return;
    }

    const newItems = reorder(
      items,
      result.source.index,
      result.destination.index,
    );

    setItems(newItems);
  };

  const createItem = (key: string, content: any) => {
    return {
      name: key,
      content,
      id: createId(),
    };
  };
  return [items, setItems, createItem, onDragEnd];
}

export default useDnD;
