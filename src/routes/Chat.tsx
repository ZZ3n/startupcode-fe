import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./styles/Chat.module.scss";
import characterImage from "../assets/char.png";
import useStore from "../store/store";
import LogModal from "../components/modals/LogModal";

const Chat: React.FC = () => {
  const [botCount, setBotCount] = useState<number>(0);
  const [userCount, setUserCount] = useState<number>(-1);
  const { thread_id, bot_chat_list, user_chat_list } = useStore();
  const [message, setMessage] = useState<string>(bot_chat_list[botCount]);
  const addToBotChatList = useStore((state) => state.addToBotChatList);
  const addToUserChatList = useStore((state) => state.addToUserChatList);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setMessage(bot_chat_list[botCount]);
  }, [botCount]);

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

    addToUserChatList(data.chat_message);
    setUserCount(userCount + 1);

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
      addToBotChatList(responseData.body.chat_message);
      setBotCount(botCount + 1);
      if (responseData.body.isend === "true") {
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

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
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
      <LogModal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        messages={bot_chat_list.map((msg, index) => ({
          role: index % 2 === 0 ? "user" : "ai",
          message: msg,
        }))}
      />
    </div>
  );
};
export default Chat;
