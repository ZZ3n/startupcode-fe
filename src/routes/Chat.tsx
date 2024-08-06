import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './styles/Chat.module.scss';
import characterImage from '../assets/char.png';

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<string[]>([
    `등산을 좋아하시는군요! 
그럼 한라산은 꼭 가보셔야겠네요.

한라산에는 다양한 등산 코스가 있는데, 
정상인 백록담까지 올라가는 코스와 중간 터를 탐방하는 코스 등이 있어요.

혹시 어떤 난이도의 등산을 선호하시나요?

초보자를 위한 코스도 좋고, 조금 도전적인 코스도 괜찮으신가요?

등산을 좋아하시는군요! 
그럼 한라산은 꼭 가보셔야겠네요.

한라산에는 다양한 등산 코스가 있는데, 
정상인 백록담까지 올라가는 코스와 중간 터를 탐방하는 코스 등이 있어요.

혹시 어떤 난이도의 등산을 선호하시나요?

초보자를 위한 코스도 좋고, 조금 도전적인 코스도 괜찮으신가요?`
  ]);
  const [inputValue, setInputValue] = useState<string>("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const navigate = useNavigate();
  const handleSubmit = () => {
    navigate('/result');
  };
  const handleRestart = () => {
    navigate(0);
  };

  return (
    <div>
      <div className="background">
        <div className="pc-background"></div>
        <div className={styles['chat-background']}>
          <div className={styles['chat-container']}>
            {messages.map((message, index) => (
              <div key={index} className={styles['chat-message']}>
                <img src={characterImage} alt="Character" />
                <p>{message}</p>
              </div>
            ))}
            <input
              type="text"
              className={styles['chat-input']}
              placeholder="입력하세요..."
              value={inputValue}
              onChange={handleInputChange}
            />
            <div className={styles['chat-button-container']}>
              <button 
                className={`${styles['chat-button']} ${styles['secondary']}`}
                onClick={handleRestart}>다시 하기</button>
              <button className={styles['chat-button']} onClick={handleSubmit}>다음</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Chat;
