import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./styles/Result.module.scss";
import characterImage from "../assets/char.png"; // 캐릭터 이미지 파일 경로 수정
import placeholderImage from "../assets/placeholder.png"; // 임시 추천 장소 이미지

const Result: React.FC = () => {
  const [resultData, setResultData] = useState<any>(null);
  const navigate = useNavigate();

  const handleHome = () => {
    navigate("/");
  };

  return (
    <div>
      <div className="background">
        <div className="pc-background"></div>
        <div className={styles["result-background"]}>
          <div className={styles["result-container"]}>
            <img
              src={resultData?.image || placeholderImage}
              alt="Result"
              className={styles["result-image"]}
            />
            <div className={styles["result-info"]}>
              <p>장소: {resultData?.location || "현제해수욕장"}</p>
              <p>
                위치:{" "}
                {resultData?.address ||
                  "제주특별자치도 제주시 한림읍 협재리 2497-1"}
              </p>
              <p>현재 기온: {resultData?.temperature || "약 24°C"}</p>
              <p>강수 확률: {resultData?.rainfallProbability || "낮음"}</p>
              <p>
                풍향:{" "}
                {resultData?.windDirection || "약간의 바람 (해양 스포츠 가능)"}
              </p>
              <p>
                자외선 지수:{" "}
                {resultData?.uvIndex || "높음 (자외선 차단제 필수)"}
              </p>
              <p>
                가능 액티비티:{" "}
                {resultData?.activities || "바나나보트, 제트스키, 패들보드 등"}
              </p>
              <p>
                편의시설:{" "}
                {resultData?.facilities || "샤워 시설, 탈의실, 화장실"}
              </p>
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
