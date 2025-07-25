import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as fullStar, faStarHalfAlt } from "@fortawesome/free-solid-svg-icons";
import { faStar as emptyStar } from "@fortawesome/free-regular-svg-icons";

const Rating = ({ rating, size = "md" }) => {
  const stars = [];

  for (let i = 1; i <= 5; i++) {
    if (rating >= i) {
      stars.push(<FontAwesomeIcon icon={fullStar} key={i} className={`text-yellow-500 ${getSize(size)}`} />);
    } else if (rating >= i - 0.5) {
      stars.push(<FontAwesomeIcon icon={faStarHalfAlt} key={i} className={`text-yellow-500 ${getSize(size)}`} />);
    } else {
      stars.push(<FontAwesomeIcon icon={emptyStar} key={i} className={`text-yellow-500 ${getSize(size)}`} />);
    }
  }

  return (
    <div className="flex gap-1 mt-1" aria-label={`Rating: ${rating} out of 5`}>
      {stars}
    </div>
  );
};

const getSize = (size) => {
  switch (size) {
    case "sm":
      return "text-sm";
    case "lg":
      return "text-xl";
    case "xl":
      return "text-2xl";
    default:
      return "text-base";
  }
};

export default Rating;
