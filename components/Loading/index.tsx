// https://cssloaders.github.io/

import styles from "./index.module.css";
export default function Loading() {
  return (
    <div>
      <span className={styles.loader}></span>
    </div>
  );
}
