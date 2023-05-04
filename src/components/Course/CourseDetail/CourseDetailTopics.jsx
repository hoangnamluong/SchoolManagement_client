import { useEffect, useRef, useState } from "react";
import CourseTopicExcerpt from "./CourseTopicExcerpt";
import { Link, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getAllTopic, setCourseId } from "../../../features/topic/topicSlice";
import useTopicSelector from "../../../hooks/Selectors/useTopicSelector";

const CourseDetailTopics = () => {
  const { courseId } = useParams();

  const dispatch = useDispatch();

  const runOnce = useRef(false);

  const [isOpen, setIsOpen] = useState(false);

  const { courseId: prevCourseId, topics, status, error } = useTopicSelector();

  useEffect(() => {
    if (runOnce.current) return;

    if (prevCourseId !== courseId) {
      dispatch(setCourseId({ courseId }));
      dispatch(getAllTopic({ courseId }));
    }

    return () => {
      runOnce.current = true;
    };
  }, []);

  const topicsTable =
    status === "fulfilled" && topics.length > 0 ? (
      <table className="course-topics__table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          {topics.slice(0, 5).map((topic) => (
            <CourseTopicExcerpt topic={topic} key={topic.id} />
          ))}
        </tbody>
      </table>
    ) : (
      <p className="my-2">No Topic</p>
    );

  return (
    <div className="course-detail__topics mt-5">
      <div
        className="topics__title course-detail__section disable-select"
        onClick={() => setIsOpen((curr) => !curr)}
      >
        <h3>Topics</h3>
        <span>&darr;</span>
      </div>
      <div className={`topics__list ${isOpen ? "active" : ""}`}>
        {topicsTable}
        <Link className="topics-all__button" to={"topic"}>
          <button className="secondary-outlined-btn">View All</button>
        </Link>
      </div>
    </div>
  );
};
export default CourseDetailTopics;
