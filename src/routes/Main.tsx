import React from 'react';
import styles from './styles/Main.module.scss'; // SCSS 파일 import
import characterImage from '../assets/char.png'; // 캐릭터 이미지 파일 경로 수정

const Main: React.FC = () => {
  return (
    <div className="background">
      <div className="pc-background"></div>
        <div className={styles['main-background']}>
        <div className={styles['character-container']}>
            <div className={styles['speech-bubble']}>
            <p>안녕하세요 :) <br /> 저에게 말을 걸어보세요!</p>
            </div>
            <img src={characterImage} alt="Character" className={styles.character} />
        </div>
        <button className={styles['start-button']}>
            시작하기
        </button>
        </div>
    </div>
  );
};

export default Main;
