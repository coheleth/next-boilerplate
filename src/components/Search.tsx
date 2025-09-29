//******************************************************************************
//    Simple searchbox component with placeholder.
//******************************************************************************

import styles from "../styles/Search.module.scss";

export function Search({ placeholder }: any) {
  return (
    <div className={styles.searchbox}>
      <input placeholder={placeholder} className={styles.searchbar} />
      <input type="submit" value="Search" className={styles.button} />
    </div>
  );
}
