import { useSelector } from "react-redux";
import {
  selectChats,
  selectError,
  selectIsOpen,
  selectPartner,
  selectSelectedChat,
  selectStatus,
} from "../../features/chat/chatSlice";

const useChatSelector = () => {
  const chats = useSelector(selectChats);
  const status = useSelector(selectStatus);
  const error = useSelector(selectError);
  const selectedChat = useSelector(selectSelectedChat);
  const isOpen = useSelector(selectIsOpen);
  const partner = useSelector(selectPartner);

  return { chats, status, error, selectedChat, isOpen, partner };
};
export default useChatSelector;
