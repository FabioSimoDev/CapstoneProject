import { useState } from "react";

export default function useImageLoader() {
  const [image, setImage] = useState(null);
  const initFilters = {
    brightness: 100,
    contrast: 100,
    saturation: 100
  };
  const [filters, setFilters] = useState(initFilters);

  const loadImage = (file) => {
    setImage(file);
  };

  const resetImage = () => {
    setImage(null);
    setFilters(initFilters);
  };

  const applyFilter = (filterType, value) => {
    setFilters({ ...filters, [filterType]: value });
  };

  return { image, resetImage, loadImage, applyFilter, filters };
}
