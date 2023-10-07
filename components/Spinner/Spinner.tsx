import styles from "./Spinner.module.css";

interface Props {}

export default function Spinner({}: Props) {
  return <span className={styles.spinner}></span>;
}
