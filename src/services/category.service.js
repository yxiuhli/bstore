import API from "../api/axios.config";

class CategoryService {
  getCategories() {
    return API.get(`/categories`);
  }
}

export default new CategoryService();
