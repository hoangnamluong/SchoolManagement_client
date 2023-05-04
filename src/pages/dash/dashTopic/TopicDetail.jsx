import "./topicDetail.scss";

import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { selectSelectedTopic } from "../../../features/topic/topicSlice";
import { selectCourseById } from "../../../features/course/courseSlice";
import useAuthSelector from "../../../hooks/Selectors/useAuthSelector";

//components
import TopicDetailExcerpt from "../../../components/Topic/TopicDetailExcerpt";
import TopicCommentForm from "../../../components/Topic/TopicCommentForm";
import Avatar from "../../../components/User/Avatar";
import TopicComments from "../../../components/Topic/TopicComments";

const TopicDetail = () => {
  const { courseId } = useParams();

  const { userInfo } = useAuthSelector();

  const { topic } = useSelector(selectSelectedTopic);
  const course = useSelector((state) => selectCourseById(state, courseId));

  return (
    topic &&
    course && (
      <div className="topic-detail">
        <div className="topic-detail__inner">
          <div className="topic-detail__title">
            <p className="m-0">
              {course && course.subject.id + " - " + course.subject.name}
            </p>
            <h1>{topic.title}</h1>
          </div>
          <div className="topic-detail__comments">
            <TopicDetailExcerpt topic={topic} />
            <TopicComments topic={topic} />
          </div>
          <div className="topic-comment__form">
            <div className="form__title">
              <Avatar img={userInfo.image} />
              <div className="title__content">
                <h5>{userInfo.username}</h5>
                <p>
                  Answer To: <b>{topic.title}</b>
                </p>
              </div>
            </div>
            <TopicCommentForm topic={topic} />
          </div>
        </div>
      </div>
    )
  );
};
export default TopicDetail;
