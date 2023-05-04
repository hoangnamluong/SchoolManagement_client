import Avatar from "../User/Avatar";

const ChatMessage = ({ message = {}, loggedUser = {} }) => {
  const allAvailable = message && loggedUser;
  const sender = loggedUser.id === message.sender.id;

  return (
    <div className={`chat__message ${sender ? "logged" : ""}`}>
      {allAvailable &&
        (sender ? (
          <span>
            <p>{message.content}</p>
            <Avatar
              img={message.sender.image}
              username={message.sender.username}
            />
          </span>
        ) : (
          <span>
            <Avatar
              img={message.sender.image}
              username={message.sender.username}
            />
            <p>{message.content}</p>
          </span>
        ))}
    </div>
  );
};
export default ChatMessage;
