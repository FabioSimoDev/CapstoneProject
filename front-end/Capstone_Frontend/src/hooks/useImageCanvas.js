import { useCallback, useRef } from "react";
import debounce from "../utils/debounceFunc";

export const useImageCanvas = (image, filters) => {
  const canvasRef = useRef(null);

  const canvasRefCallBack = useCallback(
    debounce((node) => {
      if (node && image) {
        if (!canvasRef.current) canvasRef.current = node;
        const ctx = node.getContext("2d");
        const img = new Image();
        const imgUrl = URL.createObjectURL(image);
        img.src = imgUrl;
        img.onload = () => {
          node.width = img.width;
          node.height = img.height;
          ctx.filter = `brightness(${filters.brightness}%) contrast(${filters.contrast}%) saturate(${filters.saturation}%)`;
          ctx.drawImage(img, 0, 0);
          URL.revokeObjectURL(imgUrl);
        };
      }
    }, 300),
    [filters, image]
  );

  return { canvasRefCallBack, canvasRef };
};
