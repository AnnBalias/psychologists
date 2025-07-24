import { useState } from 'react';
import AppointmentModal from '../AppointmentModal/AppointmentModal';
import ModalWrapper from '../ModalWrapper/ModalWrapper';
import StarSvg from '../../assets/icons/star.svg';
import css from './MoreInfo.module.css';

const MoreInfo = ({ psychologist }) => {
  const { avatar_url, name, reviews } = psychologist;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <ul className={css.reviewList}>
        {reviews.map((review, index) => (
          <li key={index} className={css.reviewItem}>
            <div className={css.reviewerBox}>
              <p className={css.reviewerLogo}>{review.reviewer[0]}</p>
              <div>
                <p className={css.reviewerName}>{review.reviewer}</p>
                <div className={css.ratingBox}>
                  <img src={StarSvg} alt="Star" className={css.starSvg} />
                  <p className={css.reviewerRating}>{review.rating}</p>
                </div>
              </div>
            </div>
            <p className={css.comment}>{review.comment}</p>
          </li>
        ))}
      </ul>

      <button className={css.appointmentBtn} onClick={handleOpenModal}>
        Make an appointment
      </button>

      {isModalOpen && (
        <ModalWrapper
          component={
            <AppointmentModal
              psychologist={{ name, avatar_url }}
              onClose={handleCloseModal}
            />
          }
          onClose={handleCloseModal}
        />
      )}
    </>
  );
};

export default MoreInfo;
