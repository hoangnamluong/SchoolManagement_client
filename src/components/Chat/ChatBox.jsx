import ChatMessages from "./ChatMessages";
import ChatForm from "./ChatForm";
import ChatTitle from "./ChatTitle";

import { collection } from "firebase/firestore";
import { db } from "../../config/firebase-config";

import useChatSelector from "../../hooks/Selectors/useChatSelector";
import useUserSelector from "../../hooks/Selectors/useUserSelector";

const ChatBox = () => {
  const messagesRef = collection(db, "messages");

  const { currentUser } = useUserSelector();
  const { selectedChat } = useChatSelector();
  const { id: chatId } = selectedChat;

  return (
    selectedChat && (
      <>
        <ChatTitle loggedUser={currentUser} />

        <ChatMessages
          loggedUser={currentUser}
          messagesRef={messagesRef}
          chatId={chatId}
        />

        <ChatForm
          chatId={chatId}
          messagesRef={messagesRef}
          user={currentUser}
        />
      </>
    )
  );
};
export default ChatBox;
