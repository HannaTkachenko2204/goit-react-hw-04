import { useEffect, useState } from 'react'
import SearchBar from "./components/SearchBar/SearchBar";
import { Toaster } from "react-hot-toast";
import { getPhotos } from './components/apiServise/photos';
import ImageGallery from './components/ImageGallery/ImageGallery';

function App() {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isEmpty, setIsEmpty] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if(!query) return;
const getImages = async() => {
  setIsLoading(true);
  try {
    const {total, total_pages, results} = await getPhotos(query, page);
    if(!results.length) return setIsEmpty(true);
    setImages(prevImages => [...prevImages, ...results]);
    setIsVisible(page < Math.ceil(total/total_pages))
  } catch (error) {
    setError(error);
  } finally {
    setIsLoading(false);
  }
}
getImages()
  }, [query, page])

  const onHandleSubmit = (searchQuery) => {
    setQuery(searchQuery);
  };

console.log(isVisible);

  return (
    <>
      <Toaster />
      <SearchBar onSubmit={onHandleSubmit}/>
      {images.length > 0 && <ImageGallery images={images}/>}
      {!images.length && !isEmpty}
      
    </>
  );
}

export default App;
