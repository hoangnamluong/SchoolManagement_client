import { useEffect, useRef, useState } from "react";

const useInView = (refs, options) => {
  const [elements, setElements] = useState({});

  const observerCallback = (entries) => {
    entries.forEach((entry) => {
      const name = entry.target.getAttribute("data-inview");
      if (!name) {
        console.log("No entry in view");
      } else {
        if (entry.isIntersecting) {
          setElements((prev) => ({
            ...prev,
            [name]: {
              isInView: true,
            },
          }));
        } else {
          setElements((prev) => ({
            ...prev,
            [name]: {
              isInView: false,
            },
          }));
        }
      }
    });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(observerCallback, options);

    refs.forEach((ref) => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return elements;
};
export default useInView;
