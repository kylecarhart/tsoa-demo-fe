import styles from "./Placeholder.module.css";
import clsx from "clsx";

interface Props extends React.ImgHTMLAttributes<HTMLImageElement> {
  width: number;
  height: number;
}

export default function Placeholder({
  width,
  height,
  className,
  ...props
}: Props) {
  const src = `https://placehold.co/${width}x${height}`;
  const placeholderClasses = clsx(styles.placeholder, className);

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt="placeholder"
      width={width}
      height={height}
      className={placeholderClasses}
      {...props}
    ></img>
  );
}
