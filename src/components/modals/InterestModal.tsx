import React from 'react';
import Modal from 'react-modal';
import styles from './InterestModal.module.scss';

Modal.setAppElement('#root');

interface TagModalProps {
  isOpen: boolean;
  onRequestClose: (event: React.MouseEvent | React.KeyboardEvent) => void;
  handleTagClick: (tag: string) => void;
  selectedTags: string[];
}

const InterestModal: React.FC<TagModalProps> = ({ isOpen, onRequestClose, handleTagClick, selectedTags }) => {
  const tags = ['자연', 
                '액티비티', 
                '포토스팟', 
                '맛집', 
                '카페', 
                '전시,공연', 
                '체험', 
                '관광명소', 
                '축제'
              ];

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className={styles['modal-content']}
      overlayClassName={styles['modal-overlay']}
    >
      <h2>3개까지 선택할 수 있어요!</h2>
      <div className={styles['tag-grid']}>
        {tags.map((tag) => (
          <div
            key={tag}
            className={`${styles.tag} ${selectedTags.includes(tag) ? styles.selected : ''}`}
            onClick={() => handleTagClick(tag)}
          >
            {tag}
          </div>
        ))}
      </div>
      <button className={styles['modal-button']} onClick={onRequestClose}>
        선택 완료
      </button>
    </Modal>
  );
};

export default InterestModal;
