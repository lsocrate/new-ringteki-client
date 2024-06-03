import styles from "./styles.module.css";

export function Button(p: {
  children: React.ReactNode;
  onClick?: () => void;
  onMouseDown?: (ev: any) => void;
  type?: "submit" | "reset";
}) {
  return (
    <button
      type={p.type ?? "button"}
      onClick={p.onClick}
      onMouseDown={p.onClick}
      className={styles.button}
    >
      {p.children}
    </button>
  );
}
