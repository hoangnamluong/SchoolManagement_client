import { useEffect, useState } from "react";
import useAxiosLazy from "../../hooks/useAxiosLazy";

import SearchForm from "../misc/SearchForm";
import ChatSearchUsers from "./ChatSearchUsers";

import apiEndpoints from "../../config/apiEndpoints";

import convertObjectToFormData from "../../utils/convertObjectToFormData";
import useChatSelector from "../../hooks/Selectors/useChatSelector";
import useUserSelector from "../../hooks/Selectors/useUserSelector";
import { useDispatch } from "react-redux";
import { getExistsChat } from "../../features/chat/chatSlice";

const ChatSearch = () => {
  const dispatch = useDispatch();

  const [query, setQuery] = useState("");

  const { status: chatStatus } = useChatSelector();
  const { currentUser } = useUserSelector();

  const [fetch, { data, status, error }] = useAxiosLazy({
    url: apiEndpoints.user.concat("specific-user/"),
    method: "post",
  });

  useEffect(() => {
    if (query) {
      const form = convertObjectToFormData({
        code: query,
        email: query,
      });

      fetch(form);
    }
    return () => {};
  }, [query]);

  useEffect(() => {
    if (chatStatus === "idle") {
      dispatch(getExistsChat({ loggedUser: currentUser }));
    }
  }, [chatStatus]);

  return (
    <div className="chat-search">
      <SearchForm setValue={setQuery} placeholder="Find Students, Teachers" />
      <ChatSearchUsers data={data} />
    </div>
  );
};
export default ChatSearch;
