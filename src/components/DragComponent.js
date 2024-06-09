import React from "react";

export default function DragComponent({ provided, item }) {
  return (
    <div>
      <div
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        className="w-full flex flex-row flex-wrap bg-blue-500 text-white px-2 py-1 my-2 text-sm cursor-pointer"
      >
        {item.name}
      </div>
    </div>
  );
}
