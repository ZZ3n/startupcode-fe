import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import styles from "./styles/Result.module.scss";
import useStore from "../store/store";
import characterImage from "../assets/char.png"; // 캐릭터 이미지 파일 경로 수정
import placeholderImage from "../assets/placeholder.png"; // 임시 추천 장소 이미지

interface ResultData {
  chat_message: string;
  isend: string;
}

const Result: React.FC = () => {
  const [resultData, setResultData] = useState<ResultData | null>(null);
  const { result_string } = useStore();
  const navigate = useNavigate();

  useEffect(()=> {
    console.log(result_string);
  }, [])

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
              {result_string ? (
                <ReactMarkdown className={styles["markdown-content"]}>{result_string}</ReactMarkdown>
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
