import ImageCard from "../ImageCard/ImageCard";

const ImageGallery = ({ images, onImageClick }) => {
  return (
    <ul>
      {images.map(({ id, urls, description }) => (
        <ImageCard
          key={id}
          urls={urls}
          description={description}
          onImageClick={onImageClick}
        />
      ))}
    </ul>
  );
};

export default ImageGallery;
