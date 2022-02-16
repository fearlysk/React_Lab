import styles from "./LazyProductCardLoading.module.scss";

function LazyProductCardLoading() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.ldsRoller}>
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
      </div>
    </div>
  );
}

export default LazyProductCardLoading;
