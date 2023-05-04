import { useEffect, useState } from "react";
import ChatMessage from "./ChatMessage";
import { onSnapshot, query, where, orderBy } from "firebase/firestore";
import useFirebaseChat from "../../hooks/Firebase/useFirebaseChat";
import { useDispatch } from "react-redux";
import { updateLatest } from "../../features/chat/chatSlice";

const ChatMessages = ({ chatId = "", messagesRef = null, loggedUser = {} }) => {
  const dispatch = useDispatch();

  const [messages, setMessages] = useState([]);

  const [getChat, updateLatestMessage] = useFirebaseChat();

  const queryMessages = query(
    messagesRef,
    where("chat", "==", chatId),
    orderBy("created_at", "desc")
  );

  useEffect(() => {
    const unsubscribe = onSnapshot(queryMessages, (snapshot) => {
      let mess = [];
      snapshot.forEach((doc) => {
        mess.push({ ...doc.data(), id: doc.id });
      });

      updateLatestMessage(mess[0], chatId);
      dispatch(updateLatest({ message: mess[0], chatId }));
      setMessages(mess);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const messagesRendered =
    messages.length > 0 ? (
      messages.map((message) => (
        <ChatMessage
          key={message.id}
          message={message}
          loggedUser={loggedUser}
        />
      ))
    ) : (
      <p className="text-center">Say Hi to your friend</p>
    );

  return (
    <div className="chat-display">
      <div className="chat__messages">{messagesRendered}</div>
    </div>
  );
};
export default ChatMessages;
