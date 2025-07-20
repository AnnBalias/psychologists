import StarSvg from '../../assets/icons/star.svg';
import css from './MoreInfo.module.css';

const MoreInfo = ({ reviews }) => {
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
      <button className={css.appointmentBtn}>Make an appointment</button>
    </>
  );
};

export default MoreInfo;
