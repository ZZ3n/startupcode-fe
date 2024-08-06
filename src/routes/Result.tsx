import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import styles from "./styles/Result.module.scss";
import characterImage from "../assets/char.png"; // 캐릭터 이미지 파일 경로 수정
import placeholderImage from "../assets/placeholder.png"; // 임시 추천 장소 이미지

interface ResultData {
  chat_message: string;
  isend: string;
}

const Result: React.FC = () => {
  const [resultData, setResultData] = useState<ResultData | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();
        if (data.code === 200) {
          const { chat_message, isend } = data.body;
          setResultData({
            chat_message,
            isend,
          });
        } else {
          console.error(data.message);
        }
      } catch (error) {
        console.error("Error fetching result data", error);
      }
    };

    fetchData();
  }, []);

  const handleHome = () => {
    navigate("/");
  };

  return (
    <div>
      <div className="background">
        <div className="pc-background"></div>
        <div className={styles["result-background"]}>
          <div className={styles["result-container"]}>
            <div className={styles["result-info"]}>
              {resultData ? (
                <ReactMarkdown className={styles["markdown-content"]}>{resultData.chat_message}</ReactMarkdown>
              ) : (
                <p>Loading...</p>
              )}
            </div>
            <button className={styles["result-button"]} onClick={handleHome}>
              홈으로
            </button>
            <img
              src={characterImage}
              alt="Character"
              className={styles["result-character"]}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Result;
