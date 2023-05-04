import { dateParsedShortDate } from "../../../utils/dateParse";
import shortenName from "../../../utils/shortenName";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSelectedTopic } from "../../../features/topic/topicSlice";

const TOPIC_REGEX = /topic/i;

const CourseTopicExcerpt = ({ topic }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const parseCreatedDate = dateParsedShortDate(topic.created_date);
  const name = shortenName(topic.author.first_name, topic.author.last_name);

  const handleRowOnClicked = () => {
    const path = TOPIC_REGEX.test(location.pathname);

    dispatch(setSelectedTopic({ topic }));
    navigate(path ? `${topic.id}` : `topic/${topic.id}`);
  };

  return (
    topic && (
      <tr className="course-topics__table-item" onClick={handleRowOnClicked}>
        <td>{topic.title}</td>
        <td>{name}</td>
        <td>{parseCreatedDate}</td>
        {/* <td>{topic.comments.length}</td> */}
      </tr>
    )
  );
};
export default CourseTopicExcerpt;
