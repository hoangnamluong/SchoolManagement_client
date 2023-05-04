import useChatSelector from "../../hooks/Selectors/useChatSelector";
import ChatExistsChat from "./ChatExistsChat";

const ChatExistsChats = () => {
  const { chats } = useChatSelector();

  return chats.length > 0 ? (
    chats.map((chat) => <ChatExistsChat chat={chat} key={chat.id} />)
  ) : (
    <>Find friends and start chatting</>
  );
};
export default ChatExistsChats;
