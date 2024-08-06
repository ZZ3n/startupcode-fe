import React from 'react';
import styles from './styles/Result.module.scss';
import characterImage from '../assets/char.png'; // 캐릭터 이미지 파일 경로 수정


const Result: React.FC = () => {
  return (
        <div>
      <div className="background">
        <div className="pc-background"></div>
        <div className={styles['Result-background']}>
          <div className={styles['Result-container']}>
            <div id='Result-img'>
              <p>이미지 불러오기</p>
            </div>
            <div id='Result-content'>
            <p>장소: </p>
            <p>위치: </p>
            <p>현재 기온: </p>
            <p>강수 확률: </p>
            <p>풍속: </p>
            <p>자외선지수: </p>
            <p>가능 액티비티: </p>
            <p>편의시설: </p>
            </div>
          </div>
          <button className={styles['Result-button']}>
              홈으로
          </button>
          <div className={styles['character-container']}>
            <img src={characterImage} alt="Character" className={styles.character} />
        </div>
        </div>
      </div>
    </div>
  );
};
export default Result;