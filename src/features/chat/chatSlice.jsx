import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { db } from "../../config/firebase-config";

const initialState = {
  chats: [],
  status: "idle",
  error: "",
  selectedChat: null,
  isOpen: false,
  partner: null,
};

export const getExistsChat = createAsyncThunk(
  "/exists-chats",
  async ({ loggedUser }, { rejectWithValue }) => {
    const loggedUserData = {
      id: loggedUser.id,
      email: loggedUser.email,
      image: loggedUser.image,
    };

    try {
      const chatsRef = collection(db, "chats");

      let chats = [];

      const chatsQuery = query(
        chatsRef,
        where("users", "array-contains", loggedUserData),
        orderBy("created_at", "desc")
      );

      const snapshot = await getDocs(chatsQuery);

      if (!snapshot.empty) {
        snapshot.forEach((snap) =>
          chats.push({
            id: snap.id,
            name: snap.data().name,
            users: snap.data().users,
            latest: snap.data().latest,
          })
        );
      }

      return chats;
    } catch (err) {
      if (err.response && err.response.data.error_description) {
        return rejectWithValue(err.response.data.error_description);
      } else {
        return rejectWithValue(err.message);
      }
    }
  }
);

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setChats: (state, action) => {
      state.chats = action.payload;
    },

    unshiftChats: (state, action) => {
      state.chats.unshift(action.payload);
    },

    updateLatest: (state, action) => {
      const { chatId, message } = action.payload;

      state.selectedChat.latest = message;
      state.chats = state.chats.filter((chat) => chat.id !== chatId);
      state.chats = [state.selectedChat, ...state.chats];
    },

    setSelectedChat: (state, action) => {
      state.selectedChat = action.payload;
    },

    removeSelectedChat: (state, action) => {
      state.selectedChat = null;
    },

    setPartner: (state, action) => {
      state.partner = action.payload;
    },

    removePartner: (state, action) => {
      state.partner = null;
    },

    toggleIsOpen: (state, action) => {
      state.isOpen = !state.isOpen;
    },

    displayChat: (state, action) => {
      state.isOpen = true;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getExistsChat.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(getExistsChat.fulfilled, (state, action) => {
        state.chats = [...action.payload];
        state.status = "fulfilled";
        state.error = "";
      })
      .addCase(getExistsChat.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "rejected";
      });
  },
});

export const {
  setChats,
  unshiftChats,
  updateLatest,
  setSelectedChat,
  removeSelectedChat,
  setPartner,
  removePartner,
  toggleIsOpen,
  displayChat,
} = chatSlice.actions;

export const selectChats = (state) => state.chat.chats;
export const selectStatus = (state) => state.chat.status;
export const selectError = (state) => state.chat.error;
export const selectSelectedChat = (state) => state.chat.selectedChat;
export const selectIsOpen = (state) => state.chat.isOpen;
export const selectPartner = (state) => state.chat.partner;

export default chatSlice.reducer;
