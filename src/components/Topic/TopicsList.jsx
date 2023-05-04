import useTopicSelector from "../../hooks/Selectors/useTopicSelector";
import CourseTopicExcerpt from "../Course/CourseDetail/CourseTopicExcerpt";

const TopicsList = () => {
  const { topics, status, error } = useTopicSelector();

  const topicsTable =
    topics.length > 0 ? (
      <table className="course-topics__table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Created At</th>
            {/* <th>Comments</th> */}
          </tr>
        </thead>
        <tbody>
          {topics.map((topic) => (
            <CourseTopicExcerpt topic={topic} key={topic.id} />
          ))}
        </tbody>
      </table>
    ) : (
      <p className="my-2">No Topic</p>
    );

  return (
    <div className="course-detail__topics mt-2">
      <div className="topics__list" style={{ overflow: "visible" }}>
        {topicsTable}
      </div>
    </div>
  );
};
export default TopicsList;
