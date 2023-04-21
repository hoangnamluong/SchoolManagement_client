import { useSelector } from "react-redux";
import {
  selectTopics,
  selectStatus,
  selectError,
} from "../../features/topic/topicSlice";

const useTopicSelector = () => {
  const topics = useSelector(selectTopics);
  const status = useSelector(selectStatus);
  const error = useSelector(selectError);

  return { topics, status, error };
};
export default useTopicSelector;
