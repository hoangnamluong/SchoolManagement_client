import "./topicScss/topicDetailComponents.scss";

import Avatar from "../User/Avatar";

import moment from "moment";

const TopicDetailExcerpt = ({ topic }) => {
  const dateInit = moment(topic.created_date).format(
    "dddd, DD MMMM yyyy, HH:mm:ss"
  );

  const createdDate = dateInit
    .charAt(0)
    .toUpperCase()
    .concat(dateInit.slice(1));

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
          <p className="fw-400">{createdDate}</p>
        </div>
        <div className="topic-detail-comment__content">
          <p className="fw-400" style={{ whiteSpace: "pre-line" }}>
            {topic.content}
          </p>
        </div>
      </div>
    )
  );
};
export default TopicDetailExcerpt;
