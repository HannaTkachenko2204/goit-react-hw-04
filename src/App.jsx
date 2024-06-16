import { useEffect, useState } from "react";
import SearchBar from "./components/SearchBar/SearchBar";
import { Toaster } from "react-hot-toast";
import { getPhotos } from "./components/apiServise/photos";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import Loader from "./components/Loader/Loader";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";

function App() {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isEmpty, setIsEmpty] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!query) return;
    const getImages = async () => {
      setIsLoading(true);
      try {
        const { total_pages, results } = await getPhotos(query, page);
        if (!results.length) return setIsEmpty(true);
        setImages((prevImages) => [...prevImages, ...results]);
        setIsVisible(page < total_pages);
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
    setIsVisible(false);
    setQuery(searchQuery);
  };

  const onHandleClick = () => {
    setPage(page+1);
  }

  return (
    <>
      <Toaster />
      <SearchBar onSubmit={onHandleSubmit} />
      {images.length > 0 && <ImageGallery images={images} />}
      {!images.length && !isEmpty && !isLoading && !error && <p>Let`s begin search 🔎</p>}
      {isLoading && <Loader />}
      {error && <ErrorMessage />}
      {isEmpty && <p>Sorry. There are no images...😭</p>}
      {isVisible && !isLoading && <LoadMoreBtn onHandleClick={onHandleClick}/>}
    </>
  );
}

export default App;
