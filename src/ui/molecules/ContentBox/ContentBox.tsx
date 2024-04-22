import styles from "./styles.module.css";

export function ContentBox(p: {
  title: string;
  children: React.ReactNode;
  internal?: boolean;
}) {
  return (
    <div className={`${styles.box} ${p.internal ? "" : styles.external}`}>
      <div className={styles.title}>{p.title}</div>
      <div className={styles.content}>{p.children}</div>
    </div>
  );
}
