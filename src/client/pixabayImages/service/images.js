import axios from "axios";

const instance = axios.create({
    baseURL: "https://pixabay.com/",
});

export const getAllImages = (name = "") => {
  return instance.get('api/', {
      params: {
        q: name,
        page: 1,
          key: "20959102-f72134d377a9abd463ec560fa",
          image_type: "photo",
          orientation: "horizontal",
        per_page: 12
    }
  })
};