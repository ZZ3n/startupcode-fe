import React from "react";
import styles from "../routes/styles/Loading.module.scss";

const Loading: React.FC = () => {
  return (
    <div className={styles.loading}>
      <div className={styles.spinner}></div>
      <p>Loading...</p>
    </div>
  );
};

export default Loading;
