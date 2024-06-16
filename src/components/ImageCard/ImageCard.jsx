import style from "./ImageCard.module.css";

const ImageCard = ({ urls, description, onImageClick }) => {
  return (
    <li className={style.item}>
      <img
        src={urls.small}
        alt={description}
        onClick={() => onImageClick(urls.regular)}
      />
    </li>
  );
};

export default ImageCard;
