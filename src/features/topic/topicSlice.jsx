import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../../app/api/axiosClient";
import apiEndpoints from "../../config/apiEndpoints";
import RESPONSE_STATUS from "../../config/RESPONSE_STATUS";

const initialState = {
  topics: [],
  status: "idle",
  error: "",
};

export const getAllTopic = createAsyncThunk(
  "/topic",
  async (arg, { getState, rejectWithValue }) => {
    try {
      const accessToken = getState().auth.access_token;

      const { data, status } = await axiosClient.get(apiEndpoints.topic, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (RESPONSE_STATUS.some((i) => i === status)) {
        return data;
      }
    } catch (err) {
      console.log(err);
      if (err.response && err.response.data.error_description) {
        return rejectWithValue(err.response.data.error_description);
      } else {
        return rejectWithValue(err.message);
      }
    }
  }
);

const topicSlice = createSlice({
  name: "topic",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllTopic.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(getAllTopic.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.topics = [...action.payload];
      })
      .addCase(getAllTopic.rejected, (state, action) => {
        state.status = "error";
        state.error = action.payload;
      });
  },
});

export const selectTopics = (state) => state.topic.topics;
export const selectStatus = (state) => state.topic.status;
export const selectError = (state) => state.topic.error;

export const selectTopicById = (state, topicId) =>
  state.topic.topics.find((topic) => topic.id === +topicId);

export default topicSlice.reducer;
