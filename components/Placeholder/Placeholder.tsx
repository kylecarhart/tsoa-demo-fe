import React from "react";

interface Props extends React.ImgHTMLAttributes<HTMLImageElement> {
  width: number;
  height: number;
}

export default function Placeholder({ width, height, ...props }: Props) {
  const src = `https://placehold.co/${width}x${height}`;
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt="placeholder"
      width={width}
      height={height}
      {...props}
    ></img>
  );
}
