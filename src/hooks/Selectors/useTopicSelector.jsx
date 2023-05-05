import { useSelector } from "react-redux";
import {
  selectTopics,
  selectStatus,
  selectError,
  selectCourseId,
  selectFiveTopics,
  selectPage,
  // selectAddStatus,
} from "../../features/topic/topicSlice";

const useTopicSelector = () => {
  const courseId = useSelector(selectCourseId);
  const topics = useSelector(selectTopics);
  const page = useSelector(selectPage);
  const fiveTopics = useSelector(selectFiveTopics);
  const status = useSelector(selectStatus);
  // const addStatus = useSelector(selectAddStatus);
  const error = useSelector(selectError);

  return { courseId, topics, page, fiveTopics, status, error };
};
export default useTopicSelector;
