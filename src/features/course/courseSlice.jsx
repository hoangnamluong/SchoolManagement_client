import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosPrivate } from "../../app/api/axiosClient";
import apiEndpoints from "../../config/apiEndpoints";
import RESPONSE_STATUS from "../../config/RESPONSE_STATUS";

const initialState = {
  courses: [],
  status: "idle",
  error: "",
};

export const getAllCourse = createAsyncThunk(
  "/course",
  async (arg, { getState, rejectWithValue }) => {
    try {
      const { data, status } = await axiosPrivate.get(apiEndpoints.course);

      if (RESPONSE_STATUS.some((i) => i === status)) {
        return data;
      }
    } catch (err) {
      if (err.response && err.response.data.error_description) {
        return rejectWithValue(err.response.data.error_description);
      } else {
        return rejectWithValue(err.message);
      }
    }
  }
);

const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllCourse.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(getAllCourse.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.courses = [...action.payload];
        state.error = "";
      })
      .addCase(getAllCourse.rejected, (state, action) => {
        state.status = "error";
        state.error = action.payload;
      });
  },
});

export const selectCourses = (state) => state.course.courses;
export const selectStatus = (state) => state.course.status;
export const selectError = (state) => state.course.error;

export const selectCourseById = (state, courseId) =>
  state.course.courses.find((course) => course.id === +courseId);

export default courseSlice.reducer;
