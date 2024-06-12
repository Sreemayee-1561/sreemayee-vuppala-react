import React, { useState, useEffect, useRef, useCallback } from "react";
import { useSpring, animated } from "@react-spring/web";
import CatSprite from "./CatSprite";

export default function MoveComponent({
  onReplayComplete,
  replayFlag,
  actions,
}) {
  const [currentActionIndex, setCurrentActionIndex] = useState(0);
  const [animationProps, setAnimationProps] = useSpring(() => ({
    x: 0,
    rotateZ: 0,
  }));

  const catSpriteRef = useRef(null);

  // Memoize performAction to avoid re-creating the function on every render
  const performAction = useCallback(
    (action) => {
      switch (action.name) {
        case "Move 10 steps":
          setAnimationProps((prev) => ({ x: prev.x.get() + 10 }));
          break;
        case "Turn 15 degrees":
          setAnimationProps((prev) => ({ rotateZ: prev.rotateZ.get() + 15 }));
          break;
        case "Go to x: 100, y: 100":
          setAnimationProps({ x: 100, y: 100 });
          break;
        default:
          break;
      }
      setTimeout(() => {
        setCurrentActionIndex((prevIndex) => prevIndex + 1);
      }, 500);
    },
    [setAnimationProps]
  );

  // Use effect for replayFlag
  useEffect(() => {
    if (replayFlag && actions.length > 0) {
      actions.forEach((action, i) => {
        setTimeout(() => {
          performAction(action);
          setCurrentActionIndex(i + 1);
        }, i * 500);
      });
      onReplayComplete();
    }
  }, [replayFlag, actions, performAction, onReplayComplete]);

  // Use effect for actions
  useEffect(() => {
    if (
      !replayFlag &&
      actions.length > 0 &&
      currentActionIndex < actions.length
    ) {
      performAction(actions[currentActionIndex]);
    }
  }, [actions, currentActionIndex, performAction, replayFlag]);

  return (
    <div className="flex-1 h-screen overflow-hidden flex flex-row bg-green border border-gray-200 rounded-xl ml-2 p-10">
      <animated.div style={animationProps}>
        <CatSprite ref={catSpriteRef} />
      </animated.div>
    </div>
  );
}
