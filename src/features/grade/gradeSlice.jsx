import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { axiosPrivate } from "../../app/api/axiosClient";
import apiEndpoints from "../../config/apiEndpoints";
import RESPONSE_STATUS from "../../config/RESPONSE_STATUS";
import { toast } from "react-toastify";

const initialState = {
  course_id: 0,
  students: [],
  grade_lock: "DRAFT",
  selected_student: null,
  status: "idle",
  error: "",
};

export const getGradingStudents = createAsyncThunk(
  "/grading/students",
  async (arg, { rejectWithValue }) => {
    try {
      const { data, status } = await axiosPrivate.get(
        apiEndpoints.course.concat(`${arg.courseId}/mark/`)
      );

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

export const getGradeStudent = createAsyncThunk(
  "/student/get/grade",
  async (arg, { rejectWithValue }) => {
    try {
      const { data, status } = await axiosPrivate.get(
        apiEndpoints.student.concat(`mark/`)
      );

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

export const updateGrade = createAsyncThunk(
  "/grading/students/update",
  async (arg, { rejectWithValue }) => {
    try {
      const { data, status } = await axiosPrivate.post(
        apiEndpoints.course.concat(`${arg.courseId}/mark/`),
        arg.form
      );

      if (RESPONSE_STATUS.some((i) => i === status)) {
        toast.success("Update Succeed");
        return data;
      }
    } catch (err) {
      toast.error("Update Failed");
      if (err.response && err.response.data.error_description) {
        return rejectWithValue(err.response.data.error_description);
      } else {
        return rejectWithValue(err.message);
      }
    }
  }
);

export const lockGrade = createAsyncThunk(
  "/grading/students/lock",
  async (arg, { rejectWithValue }) => {
    try {
      const { data, status } = await axiosPrivate.post(
        apiEndpoints.course.concat(`${arg.courseId}/lock/`)
      );

      if (RESPONSE_STATUS.some((i) => i === status)) {
        toast.success("Locked Succeed");
        return data;
      }
    } catch (err) {
      toast.error("Update Failed");
      if (err.response && err.response.data.error_description) {
        return rejectWithValue(err.response.data.error_description);
      } else {
        return rejectWithValue(err.message);
      }
    }
  }
);

const gradeSlice = createSlice({
  name: "grade",
  initialState,
  reducers: {
    setCourseId: (state, action) => {
      state.course_id = action.payload.courseId;
    },

    clearCourseId: (state, action) => {
      state.course_id = null;
    },

    setSelectedStudent: (state, action) => {
      state.selected_student = action.payload.student;
    },

    clearSelectedStudent: (state, action) => {
      state.selected_student = {};
    },

    lockGradeLock: (state, action) => {
      state.grade_lock = "LOCKED";
    },

    updateStudents: (state, action) => {
      const { index, student } = action.payload;

      state.students.mark_list.splice(index, 1);

      state.students.mark_list = [
        ...state.students.mark_list.slice(0, index),
        student,
        ...state.students.mark_list.slice(index),
      ];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getGradingStudents.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(getGradingStudents.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.students = action.payload;
        state.grade_lock = action.payload.status;
        state.error = "";
      })
      .addCase(getGradingStudents.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload;
      })
      .addCase(getGradeStudent.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(getGradeStudent.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.students = action.payload;
        state.error = "";
      })
      .addCase(getGradeStudent.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload;
      })
      .addCase(updateGrade.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(updateGrade.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.error = "";
        state.selected_student = null;
      })
      .addCase(updateGrade.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload;
      })
      .addCase(lockGrade.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(lockGrade.fulfilled, (state, action) => {
        state.grade_lock = "LOCKED";
        state.status = "fulfilled";
      })
      .addCase(lockGrade.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload;
      });
  },
});

export const {
  clearCourseId,
  setCourseId,
  setSelectedStudent,
  clearSelectedStudent,
  updateStudents,
  lockGradeLock,
} = gradeSlice.actions;

export const selectCourseId = (state) => state.grade.course_id;
export const selectStudents = (state) => state.grade.students;
export const selectSelectedStudent = (state) => state.grade.selected_student;
export const selectGradeLock = (state) => state.grade.grade_lock;
export const selectStatus = (state) => state.grade.status;
export const selectError = (state) => state.grade.error;

export default gradeSlice.reducer;
