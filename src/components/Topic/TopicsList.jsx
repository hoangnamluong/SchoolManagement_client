import "./topicScss/topicsList.scss";

import RightArrIcon from "../../assets/svg/right-arr.svg";
import LeftArrIcon from "../../assets/svg/left-arr.svg";

import useTopicSelector from "../../hooks/Selectors/useTopicSelector";
import CourseTopicExcerpt from "../Course/CourseDetail/CourseTopicExcerpt";

import { useDispatch } from "react-redux";
import {
  getAllTopic,
  incPage,
  descPage,
} from "../../features/topic/topicSlice";
import SpinnerComponent from "../misc/SpinnerComponent";

const TopicsList = () => {
  const dispatch = useDispatch();

  const { topics, page, status, error } = useTopicSelector();

  const count = topics?.count || 0;
  const itemsPerPage = 10;
  const totalPages = Math.ceil(count / itemsPerPage);

  const handleNextPage = () => {
    dispatch(getAllTopic({ url: topics.next }));
    dispatch(incPage());
  };

  const handlePreviousPage = () => {
    dispatch(getAllTopic({ url: topics.previous }));
    dispatch(descPage());
  };

  const topicsTable =
    topics && topics.results && topics.results.length > 0 ? (
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
          {status === "pending" ? (
            <tr>
              <td>
                <SpinnerComponent />
              </td>
            </tr>
          ) : (
            topics.results.map((topic) => (
              <CourseTopicExcerpt topic={topic} key={topic.id} />
            ))
          )}
        </tbody>
      </table>
    ) : (
      <p className="my-2">No Topic</p>
    );

  return (
    <div className="topics-table mt-2">
      {topicsTable}
      <div className="topics-table__pagination">
        <button
          onClick={handlePreviousPage}
          disabled={!topics.previous || status === "pending"}
        >
          <img src={LeftArrIcon} alt="RightArr" />
        </button>
        <p className="fw-400 m-0">
          {page}/{totalPages}
        </p>
        <button
          onClick={handleNextPage}
          disabled={!topics.next || status === "pending"}
        >
          <img src={RightArrIcon} alt="RightArr" />
        </button>
      </div>
    </div>
  );
};
export default TopicsList;
