import { dateParsedLongDateTime } from "../../utils/dateParse";
import Avatar from "../User/Avatar";

const TopicComment = ({ comment, topicTitle }) => {
  const createdAt = dateParsedLongDateTime(comment.created_date);

  return (
    comment && (
      <div className="topic-detail__comment">
        <div className="topic-detail-comment__title">
          <div className="title__inner">
            <Avatar img={comment.user.image} username={comment.user.username} />
            <div className="title__content">
              <h5>{comment.user.first_name + " " + comment.user.last_name}</h5>
              <p>
                Answer To: <b>{topicTitle}</b>
              </p>
            </div>
          </div>
          <p>{createdAt}</p>
        </div>
        <div className="topic-detail-comment__content">
          <p className="fw-400">{comment.content}</p>
        </div>
      </div>
    )
  );
};
export default TopicComment;
