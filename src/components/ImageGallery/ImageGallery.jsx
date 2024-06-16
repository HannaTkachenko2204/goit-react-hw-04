import ImageCard from "../ImageCard/ImageCard";

const ImageGallery = ({ images }) => {
  return (
    <ul>
      {images.map(({ id, urls, description }) => (
        <ImageCard key={id} urls={urls} description={description} />
      ))}
    </ul>
  );
};

export default ImageGallery;
