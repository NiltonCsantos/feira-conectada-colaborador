import React from "react";
import ContentLoader, { Circle } from "react-content-loader/native";
import { Dimensions } from "react-native";

export default function RoutesSkleton() {
  const { width } = Dimensions.get("screen");

  return (
    <ContentLoader
      backgroundColor="#333"
      foregroundColor="#999"
      speed={1}
      width={width}
      height={80} // altura total do skeleton
    >
      {/* Três círculos simulando ícones */}
      <Circle cx={50} cy={25} r={20} />       
      <Circle cx={135} cy={25} r={20} />       
      <Circle cx={220} cy={25} r={20} />      
        <Circle cx={305} cy={25} r={20} />   
    </ContentLoader>
  );
}
