import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import DragComponent from "./DragComponent";
import "./Styles.css";
import MoveComponent from "./MoveComponent";
import { MdReplay } from "react-icons/md";

export default function DragAndDropActions() {
  const motionEvents = [
    {
      id: "move",
      name: "Move 10 steps",
    },
    {
      id: "turn",
      name: "Turn 15 degrees",
    },
    {
      id: "goto",
      name: "Go to x: 100, y: 100",
    },
  ];

  const [motions, updateMotions] = useState(motionEvents);
  const [droppedMotions, setDroppedMotions] = useState([]);
  const [replayFlag, setReplayFlag] = useState(false);

  function handleOnDragEnd(result) {
    if (!result.destination) return;

    if (result.source.droppableId === result.destination.droppableId) {
      const items = Array.from(motions);
      const [reorderedItem] = items.splice(result.source.index, 1);
      items.splice(result.destination.index, 0, reorderedItem);
      updateMotions(items);
    } else if (result.destination.droppableId === "drop-area") {
      const draggedItem = motions[result.source.index];
      setDroppedMotions((prev) => [...prev, draggedItem]);
    }
  }

  return (
    <div className="w-full h-full overflow-y-auto flex flex-row items-start p-2 border-r border-gray-200">
      <div className="font-bold"> {"Events"} </div>
      <div className="w-1/2 h-full overflow-y-auto flex flex-row items-start p-2 border-r border-gray-200">
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <div className="w-1/2 h-full">
            <Droppable droppableId="droppable">
              {(provided) => (
                <div
                  className="w-full h-full  flex-col flex-wrap bg-yellow-500 text-white px-2 py-1 my-2 text-sm cursor-pointer"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {motions.map((item, index) => (
                    <Draggable
                      key={item.id}
                      draggableId={`${item.id}`}
                      index={index}
                    >
                      {(provided) => (
                        <div className="w-6/10">
                          <DragComponent provided={provided} item={item} />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>

          <div className="w-1/2 h-1200 bg-blue-100">
            <Droppable droppableId="drop-area">
              {(provided) => (
                <div
                  className="drop-area w-full h-1200 bg-gray-100 p-4"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  <h2 className="w-full h-full font-bold">Drop Area</h2>
                  {droppedMotions.map((item, index) => (
                    <div
                      key={item.id}
                      className="dropped-item bg-blue-500 text-white px-2 py-1 my-2 text-sm"
                    >
                      {item.name}
                    </div>
                  ))}
                  {provided.placeholder}
                  <button
                    onClick={() => setReplayFlag(true)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      padding: "8px",
                      backgroundColor: "#007bff",
                      color: "white",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                    }}
                  >
                    <MdReplay style={{ marginRight: "8px" }} />
                    Replay
                  </button>
                </div>
              )}
            </Droppable>
          </div>
        </DragDropContext>
      </div>
      <MoveComponent
        onReplayComplete={() => setReplayFlag(false)}
        replayFlag={replayFlag}
        actions={droppedMotions}
      />
    </div>
  );
}
