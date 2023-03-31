import { useEffect } from "react";

const useToggleClass = (elements, className) => {
  useEffect(() => {
    Object.keys(elements).map((key) => {
      elements[key].isInView
        ? document
            .querySelector(`[data-inview=${key}]`)
            .classList.add(className)
        : document
            .querySelector(`[data-inview=${key}]`)
            .classList.remove(className);
    });
  }, [elements]);
  return;
};
export default useToggleClass;
