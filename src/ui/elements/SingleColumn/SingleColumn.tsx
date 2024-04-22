import styles from "./styles.module.css";

export function SingleColumn(p: { children: React.ReactNode }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>{p.children}</div>
    </div>
  );
}
