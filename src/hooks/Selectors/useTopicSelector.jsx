import { useSelector } from "react-redux";
import {
  selectTopics,
  selectStatus,
  selectError,
  selectCourseId,
  // selectAddStatus,
} from "../../features/topic/topicSlice";

const useTopicSelector = () => {
  const courseId = useSelector(selectCourseId);
  const topics = useSelector(selectTopics);
  const status = useSelector(selectStatus);
  // const addStatus = useSelector(selectAddStatus);
  const error = useSelector(selectError);

  return { courseId, topics, status, error };
};
export default useTopicSelector;
