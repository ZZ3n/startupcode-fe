import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./styles/Chat.module.scss";
import characterImage from "../assets/char.png";
import useStore from "../store/store";

const Chat: React.FC = () => {
  const [count, setCount] = useState<number>(0);
  const { thread_id, chat_list } = useStore();
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    setMessage(chat_list[count]);
  }, [Math.floor(count / 2)]);

  const setThreadId = useStore((state) => state.setThreadId);
  const addToChatList = useStore((state) => state.addToChatList);
  // const thread_id = useStore((state) => state.thread_id);
  const [inputValue, setInputValue] = useState<string>("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const navigate = useNavigate();

  const handleSubmit = async () => {
    const data = {
      thread_id: thread_id,
      chat_message: inputValue,
    };

    addToChatList(data.chat_message);
    setCount(count + 1);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }
      const responseData = await response.json();
      addToChatList(responseData.chat_message);
      setCount(count + 1);
      if (responseData.isend) {
        navigate("/result");
      }
    } catch (error) {
      console.error("Error:", error);
      // 요청이 실패한 경우 navigate를 호출하지 않음
    }
  };

  const handleRestart = () => {
    navigate(0);
  };

  return (
    <div>
      <div className="background">
        <div className="pc-background"></div>
        <div className={styles["chat-background"]}>
          <div className={styles["chat-container"]}>
            {/* {messages.map((message, index) => ( */}
            {/* <div key={index} className={styles["chat-message"]}> */}
            <div className={styles["chat-message"]}>
              <img src={characterImage} alt="Character" />
              <p>{message}</p>
            </div>
            {/* ))} */}
            <input
              type="text"
              className={styles["chat-input"]}
              placeholder="입력하세요..."
              value={inputValue}
              onChange={handleInputChange}
            />
            <div className={styles["chat-button-container"]}>
              <button
                className={`${styles["chat-button"]} ${styles["secondary"]}`}
                onClick={handleRestart}
              >
                다시 하기
              </button>
              <button className={styles["chat-button"]} onClick={handleSubmit}>
                다음
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Chat;
