import React, { useState, useEffect } from 'react';
import { Stage, Layer, Image, Rect, Text, Circle, Line } from 'react-konva'; //konva

const GenericCanvasComponent = () => {
  let calculateY = 78;
  return (
    <>
      {/* coml ups box*/}
      <Rect
        x={0}
        y={0}
        stroke={'#545454'}
        fill={'gray'}
        width={90}
        height={189}
        fill={'#323232'}
        cornerRadius={8}
        draggable={true}
      />
      {/* title */}
      <Text
        x={15}
        y={88 - calculateY}
        text="COM."
        fontSize={12}
        fill={'#ddd'}
        fontFamily="FuturaBT-Book"
        fontStyle="bold"
        fontVariant="small-caps"
        draggable={true}
      />
      <Circle
        x={20}
        y={112 - calculateY}
        width={4}
        height={3}
        radius={4}
        fill={'red'}
        draggable={true}
      />
      <Text
        x={34}
        y={106 - calculateY}
        text="FDC,0"
        fontSize={12}
        fill={'#ddd'}
        fontFamily="FuturaBT-Book"
        fontStyle="bold"
        fontVariant="small-caps"
        draggable={true}
      />
      <Circle
        x={20}
        y={129 - calculateY}
        width={4}
        height={3}
        radius={4}
        fill={'red'}
        draggable={true}
      />
      <Text
        x={34}
        y={123 - calculateY}
        text="FDC,1"
        fontSize={12}
        fill={'#ddd'}
        fontFamily="FuturaBT-Book"
        fontStyle="bold"
        fontVariant="small-caps"
        draggable={true}
      />
      <Circle
        x={20}
        y={146 - calculateY}
        width={4}
        height={3}
        radius={4}
        fill={'red'}
        draggable={true}
      />
      <Text
        x={34}
        y={140 - calculateY}
        text="TTC,0"
        fontSize={12}
        fill={'#ddd'}
        fontFamily="FuturaBT-Book"
        fontStyle="bold"
        fontVariant="small-caps"
        draggable={true}
      />
      <Circle
        x={20}
        y={163 - calculateY}
        width={4}
        height={3}
        radius={4}
        fill={'red'}
        draggable={true}
      />
      <Text
        x={34}
        y={157 - calculateY}
        text="PUMP"
        fontSize={12}
        fill={'#ddd'}
        fontFamily="FuturaBT-Book"
        fontStyle="bold"
        fontVariant="small-caps"
        draggable={true}
      />
      <Circle
        x={20}
        y={180 - calculateY}
        width={4}
        height={3}
        radius={4}
        fill={'red'}
        draggable={true}
      />
      <Text
        x={34}
        y={174 - calculateY}
        text="VTC"
        fontSize={12}
        fill={'#ddd'}
        fontFamily="FuturaBT-Book"
        fontStyle="bold"
        fontVariant="small-caps"
        draggable={true}
      />
      <Circle
        x={20}
        y={197 - calculateY}
        width={4}
        height={3}
        radius={4}
        fill={'red'}
        draggable={true}
      />
      <Text
        x={34}
        y={191 - calculateY}
        text="HATC"
        fontSize={12}
        fill={'#ddd'}
        fontFamily="FuturaBT-Book"
        fontStyle="bold"
        fontVariant="small-caps"
        draggable={true}
      />
      <Circle
        x={20}
        y={214 - calculateY}
        width={4}
        height={3}
        radius={4}
        fill={'red'}
        draggable={true}
      />
      <Text
        x={34}
        y={208 - calculateY}
        text="TEST1"
        fontSize={12}
        fill={'#ddd'}
        fontFamily="FuturaBT-Book"
        fontStyle="bold"
        fontVariant="small-caps"
        draggable={true}
      />
      <Circle
        x={20}
        y={233 - calculateY}
        width={4}
        height={3}
        radius={4}
        fill={'red'}
        draggable={true}
      />
      <Text
        x={34}
        y={225 - calculateY}
        text="TEST2"
        fontSize={12}
        fill={'#ddd'}
        fontFamily="FuturaBT-Book"
        fontStyle="bold"
        fontVariant="small-caps"
        draggable={true}
      />
      <Circle
        x={20}
        y={250 - calculateY}
        width={4}
        height={3}
        radius={4}
        fill={'red'}
        draggable={true}
      />
      <Text
        x={34}
        y={242 - calculateY}
        text="UPS"
        fontSize={12}
        fill={'#ddd'}
        fontFamily="FuturaBT-Book"
        fontStyle="bold"
        fontVariant="small-caps"
        draggable={true}
      />
    </>
  );
};

export default GenericCanvasComponent;
