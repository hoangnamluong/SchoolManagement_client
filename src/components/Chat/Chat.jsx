import "./chat.scss";

import { Suspense, lazy, useEffect, useRef } from "react";

import ChatIcon from "../../assets/svg/chat2.svg";

import { Spinner } from "react-bootstrap";

const ChatSearch = lazy(() => import("./ChatSearch"));
const ChatBox = lazy(() => import("./ChatBox"));

import { useDispatch } from "react-redux";
import { toggleIsOpen } from "../../features/chat/chatSlice";

import useChatSelector from "../../hooks/Selectors/useChatSelector";
import useAuthSelector from "../../hooks/Selectors/useAuthSelector";
import useUserSelector from "../../hooks/Selectors/useUserSelector";

import useFirebaseChat from "../../hooks/Firebase/useFirebaseChat";
import { getCurrentUser } from "../../features/user/userSlice";

const Chat = () => {
  const dispatch = useDispatch();

  const { selectedChat, isOpen, partner } = useChatSelector();
  const { currentUser, status } = useUserSelector();

  const [getChat] = useFirebaseChat();

  const handleClickedOpen = () => {
    dispatch(toggleIsOpen());
  };

  const chatBox = (
    <Suspense fallback={<Spinner />}>
      <ChatBox />
    </Suspense>
  );

  const chatSearch = (
    <Suspense fallback={<Spinner />}>
      <ChatSearch />
    </Suspense>
  );

  useEffect(() => {
    if (partner && currentUser) {
      getChat(currentUser, partner);
    }
  }, [partner, currentUser]);

  useEffect(() => {
    if (status === "idle") {
      dispatch(getCurrentUser());
    }
  }, [status]);

  return (
    <div className="chat">
      <div className="chat__inner">
        <img
          onClick={handleClickedOpen}
          src={ChatIcon}
          width={40}
          height={40}
        ></img>
        {isOpen && (
          <div className="chat__box">
            {selectedChat && partner ? chatBox : chatSearch}
          </div>
        )}
      </div>
    </div>
  );
};
export default Chat;
