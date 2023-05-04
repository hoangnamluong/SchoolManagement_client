import ReturnIcon from "../../assets/svg/return.svg";

import filterLoggedUser from "../../utils/filterLoggedUser";

import { useDispatch, useSelector } from "react-redux";
import {
  removePartner,
  removeSelectedChat,
  selectSelectedChat,
} from "../../features/chat/chatSlice";

const ChatTitle = ({ loggedUser = {} }) => {
  const dispatch = useDispatch();

  const { users } = useSelector(selectSelectedChat);

  const filteredUser = filterLoggedUser(users, loggedUser);

  const handleRemoveChat = () => {
    dispatch(removeSelectedChat());
    dispatch(removePartner());
  };

  return (
    <div className="chat-title">
      <img src={ReturnIcon} width={30} height={30} onClick={handleRemoveChat} />
      {filteredUser && filteredUser.email}
    </div>
  );
};
export default ChatTitle;
