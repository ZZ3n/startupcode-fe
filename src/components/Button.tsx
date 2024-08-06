import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../routes/styles/Button.module.scss";
import buttonImage from "../assets/left.png";

const Button: React.FC = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(-1);
  };

  return (
    <button className={styles["back-button"]} onClick={handleClick}>
      <img
        className={styles["button-image"]}
        src={buttonImage}
        alt="Character"
      />
    </button>
  );
};
export default Button;
