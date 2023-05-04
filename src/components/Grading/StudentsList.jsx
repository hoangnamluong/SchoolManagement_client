import "./studentsList.scss";

import { useParams } from "react-router-dom";
import { useEffect, useMemo, useRef, useState } from "react";

import StudentExcerpt from "./StudentExcerpt";
import SpinnerComponent from "../misc/SpinnerComponent";

import useGradeSelector from "../../hooks/Selectors/useGradeSelector";
import { useDispatch } from "react-redux";
import {
  getGradingStudents,
  setCourseId,
} from "../../features/grade/gradeSlice";

import SearchForm from "../misc/SearchForm";

import removeAccentedLetter from "../../utils/removeAccentedLetter";

const StudentsList = () => {
  const { courseId } = useParams();
  const dispatch = useDispatch();

  const [query, setQuery] = useState("");

  const runOnce = useRef(false);

  const {
    courseId: prevCourseId,
    students,
    error,
    status,
  } = useGradeSelector();

  useEffect(() => {
    if (runOnce.current) return;

    if (courseId !== prevCourseId) {
      dispatch(setCourseId({ courseId }));
      dispatch(getGradingStudents({ courseId }));
    } else return;

    return () => {
      runOnce.current = true;
    };
  }, []);

  const filteredStudents = useMemo(() => {
    if (Object.keys(students).length === 0) return;

    return students.mark_list.filter((student) => {
      return (
        student.student.code.includes(query) ||
        removeAccentedLetter(student.student.user.first_name)
          .replace(/\s+/g, "")
          .includes(removeAccentedLetter(query).replace(/\s+/g, "")) ||
        removeAccentedLetter(student.student.user.last_name)
          .replace(/\s+/g, "")
          .includes(removeAccentedLetter(query).replace(/\s+/g, ""))
      );
    });
  }, [students, query]);

  const studentsList =
    filteredStudents &&
    filteredStudents.length > 0 &&
    filteredStudents.map((student) => (
      <StudentExcerpt student={student} key={student.student.code} />
    ));

  const studentsTable = students.mark_list ? (
    students.mark_list.length > 0 ? (
      <table className="students__list disable-select">
        <thead>
          <tr>
            <th>Student ID</th>
            <th>Full Name</th>
            <th>Final</th>
            <th colSpan={5}>Midterm</th>
            <th>GPA-10</th>
            <th>GPA-4</th>
          </tr>
        </thead>
        <tbody>{status === "fulfilled" && students && studentsList}</tbody>
      </table>
    ) : (
      <p className="mt-3">Students not found</p>
    )
  ) : (
    <p className="mt-3">Could not get students</p>
  );

  return (
    <div style={{ minHeight: "560px", marginTop: "16px" }}>
      <SearchForm
        setValue={setQuery}
        placeholder="Search by Student Id or Full Name"
      />
      {status === "pending" ? <SpinnerComponent /> : studentsTable}
    </div>
  );
};
export default StudentsList;
