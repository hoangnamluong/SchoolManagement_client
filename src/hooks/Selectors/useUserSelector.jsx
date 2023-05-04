import { useSelector } from "react-redux";
import {
  selectCurrentUser,
  selectStatus,
  selectError,
  selectUpdateStatus,
} from "../../features/user/userSlice";

const useTopicSelector = () => {
  const currentUser = useSelector(selectCurrentUser);
  const status = useSelector(selectStatus);
  const updateStatus = useSelector(selectUpdateStatus);
  const error = useSelector(selectError);

  return { currentUser, updateStatus, status, error };
};
export default useTopicSelector;
