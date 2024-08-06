import React from "react";
import styles from "../routes/styles/Toast.module.scss";

interface ToastProps {
  text: string;
}

const Toast: React.FC<ToastProps> = ({ text }) => {
  return <div className={styles["toast"]}>{text}</div>;
};

export default Toast;
