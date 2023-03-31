import { useEffect } from "react";
import "./misc.scss";

const ToTop = () => {
  useEffect(() => {
    const handleScroll = (e) => {
      const btn = document.getElementById("to-top-btn");

      if (window.scrollY >= 1000) {
        btn.classList.add("show");
      } else {
        btn.classList.remove("show");
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleClick = (e) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      className="secondary-btn to-top-btn"
      id="to-top-btn"
      onClick={handleClick}
    >
      &uarr;
    </button>
  );
};
export default ToTop;
