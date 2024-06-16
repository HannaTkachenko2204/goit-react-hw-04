import { useEffect, useState } from "react";
import SearchBar from "./components/SearchBar/SearchBar";
import { Toaster } from "react-hot-toast";
import { getPhotos } from "./components/apiServise/photos";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import Loader from "./components/Loader/Loader";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import ImageModal from "./components/ImageModal/ImageModal";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    maxWidth: "70%",
    maxHeight: "70%",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.75)",
  },
};

Modal.setAppElement("#root");

function App() {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isEmpty, setIsEmpty] = useState(false);
  const [showBtn, setShowBtn] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const openModal = (imageUrl) => {
    setSelectedImage(imageUrl);
    setModalIsOpen(true);
  };

  function closeModal() {
    setModalIsOpen(false);
    setSelectedImage(null);
  }

  useEffect(() => {
    if (!query) return;
    const getImages = async () => {
      setIsLoading(true);
      try {
        const { total_pages, results } = await getPhotos(query, page);
        if (!results.length) return setIsEmpty(true);
        setImages((prevImages) => [...prevImages, ...results]);
        setShowBtn(page < total_pages); //total_pages && total_pages !== page
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    getImages();
  }, [query, page]);

  const onHandleSubmit = (searchQuery) => {
    setImages([]);
    setPage(1);
    setIsLoading(false);
    setError(null);
    setIsEmpty(false);
    setShowBtn(false);
    setQuery(searchQuery);
  };

  const onHandleClick = () => {
    setPage(page + 1);
  };

  return (
    <>
      <Toaster />
      <SearchBar onSubmit={onHandleSubmit} />
      {images.length > 0 && (
        <ImageGallery images={images} onImageClick={openModal} />
      )}
      {!images.length && !isEmpty && !isLoading && !error && (
        <p>Let`s begin search 🔎</p>
      )}
      {isLoading && <Loader />}
      {error && <ErrorMessage />}
      {isEmpty && <p>Sorry. There are no images...😭</p>}
      {showBtn && !isLoading && <LoadMoreBtn onHandleClick={onHandleClick} />}
      <ImageModal
        modalIsOpen={modalIsOpen}
        closeModal={closeModal}
        imageUrl={selectedImage}
        customStyles={customStyles}
      />
    </>
  );
}

export default App;
