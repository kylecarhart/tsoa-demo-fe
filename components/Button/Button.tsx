import styles from "./Button.module.css";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  icon?: React.ReactNode;
}

export default function Button({ text, icon, ...props }: Props) {
  return (
    <button className={styles.button} {...props}>
      {icon}
      <span>{text}</span>
    </button>
  );
}
