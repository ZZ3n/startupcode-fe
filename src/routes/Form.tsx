import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TagModal from "../components/modals/InterestModal";
import Button from "../components/Button";
import styles from "./styles/Form.module.scss";

const Form: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [name, setName] = useState('');
  const [people, setPeople] = useState('');
  const [age, setAge] = useState('');
  const navigate = useNavigate();

  const handleRequestClose = (
    event: React.MouseEvent | React.KeyboardEvent
  ) => {
    setIsModalOpen(false);
  };

  const handleTagClick = (tag: string) => {
    setSelectedTags((prev) => {
      if (prev.includes(tag)) {
        return prev.filter((t) => t !== tag);
      } else if (prev.length < 3) {
        return [...prev, tag];
      }
      return prev;
    });
  };

  const handleSubmit = () => {
    if (!people || !age || selectedTags.length === 0 || !selectedDate) {
      toast.error('모든 정보를 입력해 주세요.');
      return;
    }
    navigate("/chat");
  };

  return (
    <div>
      <div className="background">
        <div className="pc-background"></div>
        <div className={styles["form-background"]}>
          <div className={styles["form-container"]}>
            <div className={styles["button-container"]}>
              <Button />
              <ToastContainer 
                position="top-center" 
                autoClose={5000} 
                hideProgressBar={false} 
                newestOnTop={false} 
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
              />
            </div>
            <input
              type="text"
              placeholder="이름"
              className={styles["form-field"]}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="text"
              placeholder="인원"
              className={styles["form-field"]}
              value={people}
              onChange={(e) => setPeople(e.target.value)}
            />
            <input
              type="text"
              placeholder="나이"
              className={styles["form-field"]}
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
            <div
              className={`${styles["form-field"]} ${styles["tag-input"]}`}
              onClick={() => setIsModalOpen(true)}
            >
              {selectedTags.length === 0 ? (
                <span className={styles["placeholder-text"]}>관심사</span>
              ) : (
                selectedTags.map((tag) => (
                  <span key={tag} className={styles["tag"]}>
                    {tag}
                  </span>
                ))
              )}
            </div>
            <DatePicker
              selected={selectedDate}
              onChange={(date: Date | null) => setSelectedDate(date)}
              placeholderText="날짜"
              className={styles["form-field"]}
              dateFormat="yyyy/MM/dd"
            />
          </div>
          <button className={styles["form-button"]} onClick={handleSubmit}>
            선택 완료
          </button>
        </div>
        <TagModal
          isOpen={isModalOpen}
          onRequestClose={handleRequestClose}
          handleTagClick={handleTagClick}
          selectedTags={selectedTags}
        />
      </div>
    </div>
  );
};
export default Form;
