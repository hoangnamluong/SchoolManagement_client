import { createContext, useReducer } from "react";
import { Outlet } from "react-router-dom";

export const CommentContext = createContext();

const commentReducer = (state, action) => {
  switch (action.type) {
    case "SET_COMMENTS":
      return {
        comments: action.payload,
      };
    case "PUSH_COMMENT":
      return {
        comments: [...state.comments, action.payload],
      };
    case "REPLACE_COMMENT":
      return {
        comments: [
          ...state.comments.slice(0, action.payload.index),
          action.payload.new_comment,
          ...state.comments.slice(action.payload.index),
        ],
      };
    case "REMOVE_COMMENT_AT":
      return {
        comments: state.comments.filter(
          (comment) => comment.id !== action.payload
        ),
      };
    default:
      return state;
  }
};

export const CommentProvider = ({ children = null }) => {
  const [state, dispatch] = useReducer(commentReducer, {
    comments: [],
  });

  return (
    <CommentContext.Provider value={{ ...state, dispatch }}>
      {children ? children : <Outlet />}
    </CommentContext.Provider>
  );
};
