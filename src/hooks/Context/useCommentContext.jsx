import { useContext } from "react";
import { CommentContext } from "../../context/CommentContext";

const useCommentContext = () => {
  const context = useContext(CommentContext);

  if (!context) {
    throw Error("Context should be use inside Provider scope");
  }

  return context;
};
export default useCommentContext;
