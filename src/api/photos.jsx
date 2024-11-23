import axios from "axios";
import { API_CONFIG } from "./config";

class PhotosAPI {
  _createUrl(endpoint, params) {
    const searchParams = new URLSearchParams({
      ...API_CONFIG.DEFAULT_PARAMS,
      ...params
    });
    return `${API_CONFIG.BASE_URL}${endpoint}?${searchParams.toString()}`;
  }

  async _fetchData(url) {
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.error("API error:", error);
      throw error;
    }
  }

  async getPhotos({ pageParam = 1 }) {
    console.log("entergetphoto",pageParam);
    const url = this._createUrl('photos/', { page: pageParam });
    console.log('url',url)
    return this._fetchData(url);
  }
}
const photosAPI = new PhotosAPI();

export default photosAPI;
