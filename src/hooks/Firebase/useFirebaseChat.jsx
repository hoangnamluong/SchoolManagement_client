import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  or,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../../config/firebase-config";

import {
  setChats,
  setSelectedChat,
  unshiftChats,
} from "../../features/chat/chatSlice";
import { useDispatch } from "react-redux";

const useFirebaseChat = () => {
  const dispatch = useDispatch();

  const chatsRef = collection(db, "chats");

  const getChat = async (loggedUser = {}, partner = {}) => {
    const loggedUserData = {
      id: loggedUser.id,
      email: loggedUser.email,
      image: loggedUser.image,
    };

    const partnerData = {
      id: partner.id,
      email: partner.email,
      image: partner.image,
    };

    try {
      const chatsQuery = query(
        chatsRef,
        or(
          where("users", "==", [loggedUserData, partnerData]),
          where("users", "==", [partnerData, loggedUserData])
        )
      );

      const chatSnapshot = await getDocs(chatsQuery);

      if (chatSnapshot.empty) {
        addChat(loggedUserData, partnerData);
      } else {
        let chat = {
          id: chatSnapshot.docs[0].id,
          name: chatSnapshot.docs[0].data().name,
          users: chatSnapshot.docs[0].data().users,
        };
        dispatch(setSelectedChat(chat));
      }
    } catch (err) {
      console.log(err);
    }
  };

  const addChat = async (loggedUserData, partnerData) => {
    try {
      const res = await addDoc(chatsRef, {
        name: loggedUserData.email + " " + partnerData.email,
        users: [loggedUserData, partnerData],
        created_at: new Date().toISOString(),
        latest: null,
      });

      if (res) {
        const docRef = doc(db, "chats", res.id);

        getDoc(docRef).then((snap) => {
          if (!snap.exists()) console.log("Not Found");
          let chat = {
            id: snap.id,
            name: snap.data().name,
            users: snap.data().users,
            latest: null,
          };
          dispatch(setSelectedChat(chat));
          dispatch(unshiftChats(chat));
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const updateLatestMessage = async (message, chatId) => {
    const chatRef = doc(db, "chats", chatId);
    await updateDoc(chatRef, {
      latest: message,
    });
  };

  return [getChat, updateLatestMessage];
};
export default useFirebaseChat;
