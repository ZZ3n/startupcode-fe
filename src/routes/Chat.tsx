import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./styles/Chat.module.scss";
import characterImage from "../assets/char.png";
import useStore from "../store/store";
import LogModal from "../components/modals/LogModal";

interface ChatMessage {
  role: 'user' | 'ai';
  message: string;
}

const Chat: React.FC = () => {
  const [botCount, setBotCount] = useState<number>(0);
  const [userCount, setUserCount] = useState<number>(-1);
  const { thread_id, bot_chat_list, user_chat_list } = useStore();
  const [message, setMessage] = useState<string>("");
  const addToBotChatList = useStore((state) => state.addToBotChatList);
  const addToUserChatList = useStore((state) => state.addToUserChatList);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setMessage(bot_chat_list[botCount] || "");
  }, [botCount, bot_chat_list]);

  useEffect(() => {
    setMessage(bot_chat_list[0] || "");
  }, [bot_chat_list]);

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
    setInputValue("");

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
  //   try {
  //     // 목 데이터 사용
  //     const response = {
  //       data: {
  //         body: {
  //           chat_message: "목 데이터로부터의 응답입니다.",
  //           isend: "false"
  //         }
  //       }
  //     };
      
  //     addToBotChatList(response.data.body.chat_message);
  //     setBotCount(botCount + 1);
  //     if (response.data.body.isend === "true") {
  //       navigate("/result");
  //     }
  //   } catch (error) {
  //     console.error("Error:", error);
  //   }
  // };
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

  const combineMessages = () => {
    const combined: ChatMessage[] = [];
    const maxLength = Math.max(user_chat_list.length, bot_chat_list.length);
  
    for (let i = 0; i < maxLength; i++) {
      if (i < bot_chat_list.length) {
        combined.push({ role: "ai", message: bot_chat_list[i] });
      }
      if (i < user_chat_list.length) {
        combined.push({ role: "user", message: user_chat_list[i] });
      }
    }
    return combined;
  };
  return (
    <div>
      <div className="background">
        <div className="pc-background"></div>
        <div className={styles["chat-background"]}>
          <div className={styles["chat-container"]}>
            <button className={styles["log-button"]} onClick={openModal}>
              =
            </button>
            <div className={styles["chat-message"]}>
              <img src={characterImage} alt="Character" />
              <p>{message}</p>
            </div>
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
        messages={combineMessages()}
      />
    </div>
  );
};
export default Chat;
