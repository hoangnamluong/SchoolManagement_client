import useChatSelector from "../../hooks/Selectors/useChatSelector";
import ChatExistsChats from "./ChatExistsChats";
import ChatSearchUser from "./ChatSearchUser";

const ChatSearchUsers = ({ data: users = [] }) => {
  const { chats } = useChatSelector();

  const usersRendered = users ? (
    users.length > 0 ? (
      users.map((user) => <ChatSearchUser user={user} key={user.id} />)
    ) : chats.length > 0 ? (
      <ChatExistsChats />
    ) : (
      <>
        <div className="user-bone">
          <div className="user-bone__avatar"></div>
          <div className="user-bone__content">
            <p></p>
            <p></p>
          </div>
        </div>
      </>
    )
  ) : (
    <p className="fw-400">Can not get Users</p>
  );

  return <div className="chat-search__result">{usersRendered}</div>;
};
export default ChatSearchUsers;
