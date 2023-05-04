import { useEffect } from "react";
import useAxiosLazy from "../../hooks/useAxiosLazy";
import apiEndpoints from "../../config/apiEndpoints";

//context
import { setComments } from "../../context/action/CommentAction";
import useCommentContext from "../../hooks/Context/useCommentContext";
import useUserSelector from "../../hooks/Selectors/useUserSelector";
import { useDispatch } from "react-redux";
import { getCurrentUser } from "../../features/user/userSlice";

import TopicComment from "./TopicComment";

const TopicComments = ({ topic }) => {
  const dispatch = useDispatch();

  const { comments, dispatch: commentDispatch } = useCommentContext();

  const {
    currentUser,
    updateStatus,
    status: userStatus,
    error: userError,
  } = useUserSelector();

  const [fetch, { data, status, error }] = useAxiosLazy({
    url: apiEndpoints.topic.concat(`${topic.id}/comment/`),
    method: "get",
  });

  useEffect(() => {
    if (status === "idle") fetch();
    if (status === "fulfilled") commentDispatch(setComments(data));
  }, [status]);

  useEffect(() => {
    if (userStatus === "idle") {
      dispatch(getCurrentUser());
    }
  }, [userStatus]);

  const commentsRendered = comments ? (
    comments.length > 0 ? (
      comments.map((comment) => (
        <TopicComment
          key={comment.id}
          comment={comment}
          topicTitle={topic.title}
          userId={currentUser.id ?? 0}
        />
      ))
    ) : (
      <p className="mt-3">Be the first one to reply</p>
    )
  ) : (
    <p className="mt-3">Could not get Comments</p>
  );

  return <>{commentsRendered}</>;
};
export default TopicComments;
