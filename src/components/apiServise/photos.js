import axios from "axios";

const API_KEY = "VpFMteQPlMd_SzGGuVteYDkRgFOFataPOK9OTRx35JY";
axios.defaults.baseURL = "https://api.unsplash.com/";
axios.defaults.headers.common["Authorization"] = `Client-ID ${API_KEY}`;
axios.defaults.params = {
  orientation: "landscape",
  per_page: 15,
};

export const getPhotos = async (query, page) => {
  const { data } = await axios.get("/search/photos", {
    params: {
      query,
      page,
    },
  });

  return data;
};
