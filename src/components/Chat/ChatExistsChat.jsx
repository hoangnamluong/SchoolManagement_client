import { useDispatch } from "react-redux";
import { setPartner } from "../../features/chat/chatSlice";

import useUserSelector from "../../hooks/Selectors/useUserSelector";

import filterLoggedUser from "../../utils/filterLoggedUser";

import Avatar from "../User/Avatar";

const ChatExistsChat = ({ chat }) => {
  const dispatch = useDispatch();

  const { currentUser } = useUserSelector();
  const { users, latest } = chat;

  const user = filterLoggedUser(users, currentUser);

  const onClickChat = async () => {
    dispatch(setPartner(user));
  };

  return (
    user && (
      <div className="chats__item" onClick={onClickChat}>
        <Avatar img={user.image} username={user.username} />
        <div>
          <p className="fw-400">{user.email}</p>
          <p className="fw-300">
            {latest &&
              (latest.sender.id === currentUser.id
                ? "You"
                : latest.sender.username) + `: ${latest.content}`}
          </p>
        </div>
      </div>
    )
  );
};
export default ChatExistsChat;
