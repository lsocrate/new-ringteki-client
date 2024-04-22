import styles from "./styles.module.css";

export function DoubleColumn(p: {
  left: React.ReactNode;
  right: React.ReactNode;
}) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.left}>{p.left}</div>
      <div className={styles.right}>{p.right}</div>
    </div>
  );
}
