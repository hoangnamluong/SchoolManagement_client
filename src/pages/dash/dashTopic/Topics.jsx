import "./topics.scss";

import TopicsList from "../../../components/Topic/TopicsList";
import TopicAdd from "../../../components/Topic/TopicAdd";

import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCourseById } from "../../../features/course/courseSlice";

const Topics = () => {
  const { courseId } = useParams();

  const course = useSelector((state) => selectCourseById(state, courseId));

  return (
    <div className="topics">
      <div className="topics__inner">
        <div className="topics__title">
          <p className="m-0">
            {course && course.subject.id + " - " + course.subject.name}
          </p>
          <h1>All Topics</h1>
        </div>
        <div className="mt-4 text-end">
          <TopicAdd />
        </div>
        <div>
          <TopicsList />
        </div>
      </div>
    </div>
  );
};
export default Topics;
