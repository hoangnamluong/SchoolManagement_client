import "./chat.scss";
import SendIcon from "../../assets/svg/send.svg";
import { useState } from "react";
import { addDoc } from "firebase/firestore";

const ChatForm = ({ chatId = "", messagesRef = null, user = {} }) => {
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!message) return;

    const mess = message.trim().replace(/\s+/g, " ");

    const res = await addDoc(messagesRef, {
      sender: user,
      content: mess,
      chat: chatId,
      created_at: new Date().toISOString(),
    });

    setMessage("");
  };

  const handleMessageChanged = (e) => {
    setMessage(e.target.value);
  };

  return (
    <form className="chat__form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Aa"
        value={message}
        onChange={handleMessageChanged}
      />
      <img src={SendIcon} height={30} width={30} onClick={handleSubmit} />
    </form>
  );
};
export default ChatForm;
