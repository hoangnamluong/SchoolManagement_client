import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosPrivate } from "../../app/api/axiosClient";
import apiEndpoints from "../../config/apiEndpoints";
import RESPONSE_STATUS from "../../config/RESPONSE_STATUS";

const initialState = {
  course_id: 0,
  topics: [],
  selectedTopic: null,
  status: "idle",
  // add_status: "idle",
  error: "",
};

export const getAllTopic = createAsyncThunk(
  "/topic",
  async (arg, { getState, rejectWithValue }) => {
    try {
      const { data, status } = await axiosPrivate.get(
        apiEndpoints.course.concat(`${arg.courseId}/topic/`)
      );

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

// export const addTopic = createAsyncThunk(
//   "/topic/add",
//   async (arg, { getState, rejectWithValue }) => {
//     try {
//       const accessToken = getState().auth.access_token;

//       const { data, status } = await axiosClient.post(
//         apiEndpoints.course.concat(`${arg.courseId}/topic/`),
//         arg.data,
//         {
//           headers: {
//             Authorization: `Bearer ${accessToken}`,
//           },
//         }
//       );

//       if (RESPONSE_STATUS.some((i) => i === status)) {
//         return data;
//       }
//     } catch (err) {
//       console.log(err);
//       if (err.response && err.response.data.error_description) {
//         return rejectWithValue(err.response.data.error_description);
//       } else {
//         return rejectWithValue(err.message);
//       }
//     }
//   }
// );

const topicSlice = createSlice({
  name: "topic",
  initialState,
  reducers: {
    setSelectedTopic: (state, action) => {
      state.selectedTopic = action.payload;
    },

    appendAddedTopic: (state, action) => {
      state.topics = [...state.topics, action.payload];
    },

    setCourseId: (state, action) => {
      state.course_id = action.payload.courseId;
    },

    clearCourseId: (state, action) => {
      state.course_id = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllTopic.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(getAllTopic.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.topics = [...action.payload.results];
        state.error = "";
      })
      .addCase(getAllTopic.rejected, (state, action) => {
        state.status = "error";
        state.error = action.payload;
      });
    // .addCase(addTopic.pending, (state, action) => {
    //   state.add_status = "pending";
    // })
    // .addCase(addTopic.fulfilled, (state, action) => {
    //   state.add_status = "fulfilled";
    //   state.topics = [...state.topics, action.payload];
    // })
    // .addCase(addTopic.rejected, (state, action) => {
    //   state.add_status = "error";
    //   state.error = action.payload;
    // });
  },
});

export const {
  setSelectedTopic,
  appendAddedTopic,
  setCourseId,
  clearCourseId,
} = topicSlice.actions;

export const selectCourseId = (state) => state.topic.course_id;
export const selectTopics = (state) => state.topic.topics;
export const selectSelectedTopic = (state) => state.topic.selectedTopic;
export const selectStatus = (state) => state.topic.status;
// export const selectAddStatus = (state) => state.topic.add_status;
export const selectError = (state) => state.topic.error;

export const selectTopicById = (state, topicId) =>
  state.topic.topics.find((topic) => topic.id === +topicId);

export default topicSlice.reducer;
