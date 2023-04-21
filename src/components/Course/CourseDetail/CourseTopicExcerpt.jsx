import format from "date-fns/format";
import { dateParsedShortDate } from "../../../utils/dateParse";
import shortenName from "../../../utils/shortenName";
import { Link, useNavigate } from "react-router-dom";

const CourseTopicExcerpt = ({ topic }) => {
  const navigate = useNavigate();

  const parseCreatedDate = dateParsedShortDate(topic.created_date);
  const name = shortenName(topic.author.first_name, topic.author.last_name);

  const handleRowOnClicked = () => {
    navigate(`topic/${topic.id}`);
  };

  return (
    topic && (
      <tr className="course-topics__table-item" onClick={handleRowOnClicked}>
        <td>{topic.title}</td>
        <td>{name}</td>
        <td>{parseCreatedDate}</td>
        <td>{topic.comments.length}</td>
      </tr>
    )
  );
};
export default CourseTopicExcerpt;
