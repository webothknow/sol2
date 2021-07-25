import React, { useState, useEffect } from 'react';
import { Stage, Layer, Image, Rect, Text, Circle, Line } from 'react-konva'; //konva
import pnid_6_21 from './pnid_6_21.png'; //pnid img
import PuiMenuComponent from './PuiMenuComponent'; // MenuComponent

const PuiKonvaComponent = () => {
  const [image, setImage] = useState();
  const [stageScale, setStageScale] = useState(1);
  const [stageX, setStageX] = useState(0);
  const [stageY, setStageY] = useState(0);
  const [lastX, setLastX] = useState(0);
  const [lastY, setLastY] = useState(0);

  const handleImageLastPosition = (e) => {
    setLastX(e.target.attrs.x);
    setLastY(e.target.attrs.y);
  };

  const handleWheel = (e) => {
    e.evt.preventDefault();

    const scaleBy = 1.2;
    const stage = e.target.getStage();
    const oldScale = stage.scaleX();
    const mousePointTo = {
      x: stage.getPointerPosition().x / oldScale - stage.x() / oldScale,
      y: stage.getPointerPosition().y / oldScale - stage.y() / oldScale,
    };

    const newScale =
      e.evt.deltaY > 0
        ? oldScale > 3
          ? oldScale
          : oldScale * scaleBy
        : oldScale < 1
        ? oldScale
        : oldScale / scaleBy;

    setStageScale(newScale);
    setStageX(-(mousePointTo.x - stage.getPointerPosition().x / newScale) * newScale);
    setStageY(-(mousePointTo.y - stage.getPointerPosition().y / newScale) * newScale);
  };

  function getDistance(p1, p2) {
    return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
  }

  function getCenter(p1, p2) {
    return {
      x: (p1.x + p2.x) / 2,
      y: (p1.y + p2.y) / 2,
    };
  }

  let lastCenter = null;
  let lastDist = 0;

  const handleMultiTouch = (e) => {
    e.evt.preventDefault();
    let touch1 = e.evt.touches[0];
    let touch2 = e.evt.touches[1];
    const stage = e.target.getStage();

    if (touch1 && touch2) {
      if (stage.isDragging()) {
        stage.stopDrag();
      }

      let p1 = {
        x: touch1.clientX,
        y: touch1.clientY,
      };
      let p2 = {
        x: touch2.clientX,
        y: touch2.clientY,
      };

      if (!lastCenter) {
        lastCenter = getCenter(p1, p2);
        return;
      }
      let newCenter = getCenter(p1, p2);

      let dist = getDistance(p1, p2);

      if (!lastDist) {
        lastDist = dist;
      }

      // local coordinates of center point
      let pointTo = {
        x: (newCenter.x - stage.x()) / stage.scaleX(),
        y: (newCenter.y - stage.y()) / stage.scaleX(),
      };

      let scale = stage.scaleX() * (dist / lastDist);

      stage.scaleX(scale);
      stage.scaleY(scale);

      // calculate new position of the stage
      let dx = newCenter.x - lastCenter.x;
      let dy = newCenter.y - lastCenter.y;

      let newPos = {
        x: newCenter.x - pointTo.x * scale + dx,
        y: newCenter.y - pointTo.y * scale + dy,
      };

      stage.position(newPos);
      stage.batchDraw();

      lastDist = dist;
      lastCenter = newCenter;
    }
  };

  const multiTouchEnd = () => {
    lastCenter = null;
    lastDist = 0;
  };

  useEffect(() => {
    const img = new window.Image();
    img.src = pnid_6_21;
    img.onload = () => {
      setImage(img);
    };
  }, []);
  return (
    <Stage
      className="stage"
      draggable={true}
      onWheel={handleWheel}
      scaleX={stageScale}
      scaleY={stageScale}
      x={stageX}
      y={stageY}
      onTouchMove={handleMultiTouch}
      onTouchEnd={multiTouchEnd}
      width={window.innerWidth}
      height={window.innerHeight}
    >
      <Layer>
        {/* <Image image={image} width={900} height={970} draggable={false} /> */}
        {/* height={1150} */}
        {/* y={-30} */}
        <Image image={image} width={1150} height={1200} draggable={false} x={-141} y={-120} />
        <PuiMenuComponent />
      </Layer>
    </Stage>
  );
};

export default PuiKonvaComponent;
