import React, { useState, useEffect, useRef } from "react";
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

  useEffect(() => {
    if (replayFlag === true && actions.length > 0) {
      for (let i = 0; i < actions.length; i++) {
        performAction(actions[i]);
        setCurrentActionIndex(i + 1);
      }
    }
    onReplayComplete();
  }, [replayFlag]);

  useEffect(() => {
    if (
      replayFlag === false &&
      actions.length > 0 &&
      currentActionIndex < actions.length
    ) {
      performAction(actions[currentActionIndex]);
    }
  }, [actions, currentActionIndex]);

  const performAction = (action) => {
    switch (action.name) {
      case "Move 10 steps":
        setAnimationProps({ x: animationProps.x.get() + 10 });
        break;
      case "Turn 15 degrees":
        setAnimationProps({ rotateZ: animationProps.rotateZ.get() + 15 });
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
  };

  return (
    <div className="flex-1 h-screen overflow-hidden flex flex-row bg-green border border-gray-200 rounded-xl ml-2 p-10">
      <animated.div style={animationProps}>
        <CatSprite ref={catSpriteRef} />
      </animated.div>
    </div>
  );
}
