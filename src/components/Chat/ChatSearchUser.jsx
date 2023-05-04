import Avatar from "../User/Avatar";

import { useDispatch } from "react-redux";
import { setPartner } from "../../features/chat/chatSlice";

const ChatSearchUser = ({ user = null }) => {
  const dispatch = useDispatch();

  const handleClickedChat = () => {
    dispatch(setPartner(user));
  };

  return (
    user && (
      <div
        className="result-item disable-select mt-2"
        onClick={handleClickedChat}
      >
        <Avatar img={user.image} />
        <div>
          <p className="fw-400">{user.email}</p>
        </div>
      </div>
    )
  );
};
export default ChatSearchUser;
