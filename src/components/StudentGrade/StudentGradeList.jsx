import "./studentGrade.scss";

import { useEffect, useMemo, useState } from "react";
import { useRef } from "react";
import { useDispatch } from "react-redux";

import useGradeSelector from "../../hooks/Selectors/useGradeSelector";
import { getGradeStudent } from "../../features/grade/gradeSlice";

import SearchForm from "../misc/SearchForm";
import StudentGradeExcerpt from "./StudentGradeExcerpt";

import removeAccentedLetter from "../../utils/removeAccentedLetter";

const StudentGradeList = () => {
  const dispatch = useDispatch();

  const [query, setQuery] = useState("");

  const { students, status } = useGradeSelector();

  useEffect(() => {
    if (status === "idle") {
      dispatch(getGradeStudent());
    }
  }, [status]);

  const filteredGrades = useMemo(() => {
    return students.filter((student) => {
      return (
        student.course.subject.id.toLowerCase().includes(query.toLowerCase()) ||
        removeAccentedLetter(student.course.subject.name)
          .replace(/\s+/g, "")
          .includes(removeAccentedLetter(query).replace(/\s+/g, ""))
      );
    });
  }, [students, query]);

  const gradesItem =
    filteredGrades &&
    filteredGrades.length > 0 &&
    filteredGrades.map((grade) => (
      <StudentGradeExcerpt grade={grade} key={grade.id} />
    ));

  const gradesTable = students ? (
    students.length > 0 ? (
      <table className="grades-list__table disable-select">
        <thead>
          <tr>
            <th>Subject Id</th>
            <th>Subject Name</th>
            <th>Final</th>
            <th colSpan={5}>Midterm</th>
            <th>GPA-10</th>
            <th>GPA-4</th>
          </tr>
        </thead>
        <tbody>{status === "fulfilled" && students && gradesItem}</tbody>
      </table>
    ) : (
      <p className="mt-3">Grades not found</p>
    )
  ) : (
    <p className="mt-3">Could not get Grades</p>
  );

  return (
    <>
      <SearchForm
        setValue={setQuery}
        placeholder="Find by Subject Id, Subject Name"
      />
      {gradesTable}
    </>
  );
};
export default StudentGradeList;
