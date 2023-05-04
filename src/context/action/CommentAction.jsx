export const setComments = (comments) => {
  return {
    type: "SET_COMMENTS",
    payload: comments,
  };
};

export const pushComment = (comment) => {
  return {
    type: "PUSH_COMMENT",
    payload: comment,
  };
};

export const replaceComment = (comment, index) => {
  return {
    type: "REPLACE_COMMENT",
    payload: {
      index,
      new_comment: comment,
    },
  };
};

export const removeCommentAt = (commentId) => {
  return {
    type: "REMOVE_COMMENT_AT",
    payload: commentId,
  };
};
