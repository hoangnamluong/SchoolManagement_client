import { useSelector } from "react-redux";
import {
  selectAccessToken,
  selectStatus,
  selectError,
  selectRefreshStatus,
  selectUserInfo,
} from "../../features/auth/authSlice";

const useAuthSelector = () => {
  const accessToken = useSelector(selectAccessToken);
  const status = useSelector(selectStatus);
  const error = useSelector(selectError);
  const refreshStatus = useSelector(selectRefreshStatus);
  const userInfo = useSelector(selectUserInfo);

  return { accessToken, status, error, refreshStatus, userInfo };
};

export default useAuthSelector;
