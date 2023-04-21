import Avatar from "../User/Avatar";
import "./topicDetailComponents.scss";
import { dateParsedLongDateTime } from "../../utils/dateParse";

const TopicDetailExcerpt = ({ topic }) => {
  const createdAt = dateParsedLongDateTime(topic.created_date);

  return (
    topic && (
      <div className="topic-detail__comment">
        <div className="topic-detail-comment__title">
          <div className="title__inner">
            <Avatar img={topic.author.image} username={topic.author.username} />
            <div className="title__content">
              <h5>{topic.author.first_name + " " + topic.author.last_name}</h5>
              <p>
                Question To: <b>{topic.title}</b>
              </p>
            </div>
          </div>
          <p>{createdAt}</p>
        </div>
        <div className="topic-detail-comment__content">
          <p className="fw-400">{topic.content}</p>
        </div>
      </div>
    )
  );
};
export default TopicDetailExcerpt;
