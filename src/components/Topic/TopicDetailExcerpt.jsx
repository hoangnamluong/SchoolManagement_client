import Moment from "react-moment";
import Avatar from "../User/Avatar";
import "./topicScss/topicDetailComponents.scss";

const TopicDetailExcerpt = ({ topic }) => {
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
          <Moment format="dddd DD-MMMM-yyyy HH:mm:ss">
            {topic.created_date}
          </Moment>
        </div>
        <div className="topic-detail-comment__content">
          <p className="fw-400">{topic.content}</p>
        </div>
      </div>
    )
  );
};
export default TopicDetailExcerpt;
