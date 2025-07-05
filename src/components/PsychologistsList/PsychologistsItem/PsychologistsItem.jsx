import css from './PsychologistsItem.module.css';

const PsychologistsItem = ({ psychologist }) => {
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
  } = psychologist;
  return (
    <>
      <img src={avatar_url} alt={name} />
      <div>
        <div>
          <div>
            <p>Psychologist</p>
            <h3>{name}</h3>
          </div>
          <div>
            <ul>
              <li>Rating: {rating}</li>
              <li>Price / 1 hour: {price_per_hour}$</li>
            </ul>
            <p>heart</p>
          </div>
        </div>

        <ul>
          <li>Experience: {experience}</li>
          <li>License: {license}</li>
          <li>Specialization: {specialization}</li>
          <li>Initial_consultation: {initial_consultation}</li>
        </ul>
        <p>{about}</p>
      </div>
    </>
  );
};

export default PsychologistsItem;
