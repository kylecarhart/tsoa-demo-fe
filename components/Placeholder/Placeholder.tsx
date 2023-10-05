import Image from "next/image";
import React from "react";

interface Props {
  width: number;
  height: number;
}

export default function Placeholder({ width, height }: Props) {
  const src = `https://placehold.co/${width}x${height}`;
  return <img src={src} alt="placeholder" width={width} height={height}></img>;
}
