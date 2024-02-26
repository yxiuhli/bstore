import { createContext, useContext, useEffect, useState } from "react";
import categoryService from "../services/category.service";

const CategoryContext = createContext();

const CategoryProvider = ({ children }) => {
  const [categories, setCategories] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    categoryService.getCategories().then((response) => {
      setCategories(response.data);
      setIsLoading(false);
    });
  }, []);

  return (
    <CategoryContext.Provider
      value={{ categories, setCategories, isLoading, setIsLoading }}
    >
      {children}
    </CategoryContext.Provider>
  );
};

const useCategory = () => {
  const context = useContext(CategoryContext);
  if (context === undefined) {
    throw new Error("useCategory must be used within a CategoryProvider");
  }
  return context;
};

export { CategoryContext, CategoryProvider, useCategory };
