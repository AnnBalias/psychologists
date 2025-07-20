import OnlineSvg from '../../../assets/icons/online.svg';
import HeartActiveSvg from '../../../assets/icons/heart-active.svg';
import HeartSvg from '../../../assets/icons/heart.svg';
import StarSvg from '../../../assets/icons/star.svg';
import css from './PsychologistsItem.module.css';
import MoreInfo from '../../MoreInfo/MoreInfo';
import { useState } from 'react';

const PsychologistsItem = ({ psychologist }) => {
  const isFavorite = psychologist.isOnline;
  const [isMore, setIsMore] = useState(false);

  const {
    about,
    avatar_url,
    experience,
    id,
    initial_consultation,
    license,
    name,
    price_per_hour,
    rating,
    reviews,
    specialization,
    isOnline,
  } = psychologist;

  return (
    <>
      <div className={css.avatarBox}>
        <img src={avatar_url} alt={name} className={css.avatar} />
        {isOnline && (
          <img src={OnlineSvg} alt="Online" className={css.onlineSvg} />
        )}
      </div>
      <div className={css.textBox}>
        <div className={css.cardHeader}>
          <div className={css.nameBox}>
            <p className={css.position}>Psychologist</p>
            <h3 className={css.name}>{name}</h3>
          </div>
          <ul className={css.filterInfo}>
            <li className={css.filterItem}>
              <img src={StarSvg} alt="Star" className={css.starSvg} />
              Rating: {rating}
            </li>
            <li className={css.filterItem}>
              Price / 1 hour: {price_per_hour}$
            </li>
          </ul>
          <button className={css.heartBtn}>
            {isFavorite ? (
              <img
                src={HeartActiveSvg}
                alt="Favorite"
                className={css.heartSvg}
              />
            ) : (
              <img
                src={HeartSvg}
                alt="Not a favorite"
                className={css.heartSvg}
              />
            )}
          </button>
        </div>
        <ul className={css.mainInfoList}>
          <li className={css.mainInfoItem}>
            <p className={css.mainInfoText}>
              Experience: <span className={css.mainInfoSpan}>{experience}</span>
            </p>
          </li>
          <li className={css.mainInfoItem}>
            <p className={css.mainInfoText}>
              License: <span className={css.mainInfoSpan}>{license}</span>
            </p>
          </li>
          <li className={css.mainInfoItem}>
            <p className={css.mainInfoText}>
              Specialization:{' '}
              <span className={css.mainInfoSpan}>{specialization}</span>
            </p>
          </li>
          <li className={css.mainInfoItem}>
            <p className={css.mainInfoText}>
              Initial_consultation:{' '}
              <span className={css.mainInfoSpan}>{initial_consultation}</span>
            </p>
          </li>
        </ul>
        <p className={css.about}>{about}</p>
        {isMore ? (
          <MoreInfo reviews={reviews} />
        ) : (
          <button onClick={() => setIsMore(true)} className={css.moreInfoBtn}>
            Read more
          </button>
        )}
      </div>
    </>
  );
};

export default PsychologistsItem;
