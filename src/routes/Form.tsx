import React from 'react';
import styles from './styles/Form.module.scss';

const Form: React.FC = () => {
  return (
    <div>
      <div className="background">
        <div className="pc-background"></div>
        <div className={styles['form-background']}>
          <div className={styles['form-container']}>
            <input type="text" placeholder="인원" className={styles['form-field']} />
            <input type="text" placeholder="나이" className={styles['form-field']} />
            <input type="text" placeholder="관심사" className={styles['form-field']} />
            <input type="text" placeholder="날짜" className={styles['form-field']} />
          </div>
          <button className={styles['form-button']}>
              선택 완료
          </button>
        </div>
      </div>
    </div>
  );
};
export default Form;