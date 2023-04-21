import "./topicDetail.scss";

import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { selectTopicById } from "../../../features/topic/topicSlice";
import { selectCourseById } from "../../../features/course/courseSlice";
import useAuthSelector from "../../../hooks/Selectors/useAuthSelector";
import { useEffect } from "react";

import TopicDetailExcerpt from "../../../components/Topic/TopicDetailExcerpt";
import TopicComment from "../../../components/Topic/TopicComment";
import TopicCommentForm from "../../../components/Topic/TopicCommentForm";
import Avatar from "../../../components/User/Avatar";

const TopicDetail = () => {
  const { topicId, courseId } = useParams();

  const { userInfo } = useAuthSelector();

  const topic = useSelector((state) => selectTopicById(state, topicId));
  const course = useSelector((state) => selectCourseById(state, courseId));

  useEffect(() => {
    console.log(topic);
  }, []);

  const commentsRendered = topic.comments ? (
    topic.comments.length > 0 &&
    topic.comments.map((comment) => (
      <TopicComment
        key={comment.id}
        comment={comment}
        topicTitle={topic.title}
      />
    ))
  ) : (
    <p>Be the first one to reply</p>
  );

  console.log(course);

  return (
    topic &&
    course && (
      <div className="topic-detail">
        <div className="topic-detail__inner">
          <div className="topic-detail__title">
            <p className="m-0">
              {course.subject.id + " - " + course.subject.name}
            </p>
            <h2>{topic.title}</h2>
          </div>
          <div className="topic-detail__comments">
            <TopicDetailExcerpt topic={topic} />
            {commentsRendered}
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
            <TopicCommentForm />
          </div>
        </div>
      </div>
    )
  );
};
export default TopicDetail;
