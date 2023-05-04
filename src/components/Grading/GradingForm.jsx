import SaveIcon from "../../assets/svg/save.svg";
import CloseIcon from "../../assets/svg/close.svg";

import { useDispatch } from "react-redux";
import {
  clearSelectedStudent,
  updateStudents,
} from "../../features/grade/gradeSlice";
import useGradeSelector from "../../hooks/Selectors/useGradeSelector";

import { useEffect, useState } from "react";

import useStudentState from "./hooks/useStudentState";

const GradingForm = () => {
  const dispatch = useDispatch();

  const { selectedStudent, gradeLock } = useGradeSelector();

  const student = selectedStudent?.student || false;
  const id = selectedStudent?.id || 0;
  const idx = selectedStudent?.idx || 0;

  const {
    final,
    mid1,
    mid2,
    mid3,
    mid4,
    mid5,
    handleFinalChanged,
    handleMid1Changed,
    handleMid2Changed,
    handleMid3Changed,
    handleMid4Changed,
    handleMid5Changed,
  } = useStudentState({ selectedStudent });

  const convertMark = (data, field) => {
    if (Object.keys(data).length > 0) {
      if (field === "final") {
        return {
          is_final: true,
          is_midterm: false,
          value: +data.value,
          id: data?.id || 0,
        };
      } else
        return {
          is_final: false,
          is_midterm: true,
          value: +data.value,
          id: data?.id || 0,
        };
    }

    return;
  };

  const convertForm = () => {
    let form = {
      id,
      student,
      marks_detail: [],
    };

    if (final.value !== "") {
      form.marks_detail.unshift(convertMark(final, "final"));
    }
    if (mid5 && mid5.value !== "") {
      form.marks_detail.unshift(convertMark(mid5));
    }
    if (mid4 && mid4.value !== "") {
      form.marks_detail.unshift(convertMark(mid4));
    }
    if (mid3 && mid3.value !== "") {
      form.marks_detail.unshift(convertMark(mid3));
    }
    if (mid2 && mid2.value !== "") {
      form.marks_detail.unshift(convertMark(mid2));
    }
    if (mid1 && mid1.value !== "") {
      form.marks_detail.unshift(convertMark(mid1));
    }

    return form;
  };

  const handleClearSelectedStudent = () => {
    dispatch(clearSelectedStudent());
  };

  const handleUpdateStudentGrade = () => {
    if (Object.keys(selectedStudent).length === 0) return;

    const form = convertForm();

    dispatch(updateStudents({ index: idx, student: form }));
  };

  return (
    <div className="grading-form">
      <div className="grading-form__inputs">
        <div className="grading-input__container">
          <label>Student Id:</label>
          <input disabled value={student ? student.code : ""} />
        </div>
        <div className="grading-input__container">
          <label>Full Name:</label>
          <input
            disabled
            value={
              student
                ? student.user.first_name + " " + student.user.last_name
                : ""
            }
          />
        </div>
        <div className="grading-input__container editable">
          <label>Final Term Mark:</label>
          <input
            type="text"
            maxLength={4}
            value={final ? final.value : ""}
            onChange={handleFinalChanged}
            disabled={gradeLock === "LOCKED"}
          />
        </div>
        <div className="grading-input__container editable">
          <label>Mid Term Mark:</label>
          <div className="mid-term">
            <input
              type="text"
              maxLength={4}
              value={mid1 ? mid1.value : ""}
              onChange={handleMid1Changed}
              disabled={gradeLock === "LOCKED"}
            />
            <input
              type="text"
              maxLength={4}
              value={mid2 ? mid2.value : ""}
              onChange={handleMid2Changed}
              disabled={gradeLock === "LOCKED"}
            />
            <input
              type="text"
              maxLength={4}
              value={mid3 ? mid3.value : ""}
              onChange={handleMid3Changed}
              disabled={gradeLock === "LOCKED"}
            />
            <input
              type="text"
              maxLength={4}
              value={mid4 ? mid4.value : ""}
              onChange={handleMid4Changed}
              disabled={gradeLock === "LOCKED"}
            />
            <input
              type="text"
              maxLength={4}
              value={mid5 ? mid5.value : ""}
              onChange={handleMid5Changed}
              disabled={gradeLock === "LOCKED"}
            />
          </div>
        </div>
      </div>
      <div className="grading-form__buttons">
        <button
          className="svg-btn"
          style={{ border: `2px solid #198754` }}
          onClick={handleUpdateStudentGrade}
          disabled={gradeLock === "LOCKED"}
        >
          <img src={SaveIcon} width={30} height={30} />
        </button>
        <button
          className="svg-btn"
          style={{ border: `2px solid #ff0033` }}
          onClick={handleClearSelectedStudent}
          disabled={gradeLock === "LOCKED"}
        >
          <img src={CloseIcon} height={30} width={30} />
        </button>
      </div>
    </div>
  );
};
export default GradingForm;
