import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as fullStar, faStarHalfAlt } from "@fortawesome/free-solid-svg-icons";
import { faStar as emptyStar } from "@fortawesome/free-regular-svg-icons";

const Rating = ({ rating }) => {
  const stars = [];

  for (let i = 1; i <= 5; i++) {
    if (rating >= i) {
      stars.push(<FontAwesomeIcon icon={fullStar} key={i} className="text-yellow-500" />);
    } else if (rating >= i - 0.5) {
      stars.push(<FontAwesomeIcon icon={faStarHalfAlt} key={i} className="text-yellow-500" />);
    } else {
      stars.push(<FontAwesomeIcon icon={emptyStar} key={i} className="text-yellow-500" />);
    }
  }

  return <div className="flex gap-1 mt-1">{stars}</div>;
};

export default Rating;
