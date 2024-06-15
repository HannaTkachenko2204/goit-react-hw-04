const ImageCard = ({urls, description}) => {
  return (
    <div>
      <img src={urls.small} alt={description} />
    </div>
  );
};

export default ImageCard;
