import "./courseMembers.scss";

import { useMemo } from "react";

import apiEndpoints from "../../../config/apiEndpoints";

import useAxios from "../../../hooks/useAxios";

import SpinnerComponent from "../../misc/SpinnerComponent";
import CourseMemberExcerpt from "./CourseMemberExcerpt";

import removeAccentedLetter from "../../../utils/removeAccentedLetter";

const CourseMembersList = ({ courseId, query = "" }) => {
  const {
    data: students,
    status,
    error,
  } = useAxios({
    url: apiEndpoints.course.concat(`${courseId}/student/`),
    method: "get",
  });

  const filteredStudents = useMemo(() => {
    return (
      students.results &&
      students.results.filter((student) => {
        return (
          student.code.includes(query) ||
          removeAccentedLetter(student.user.first_name)
            .replace(/\s+/g, "")
            .includes(removeAccentedLetter(query).replace(/\s+/g, "")) ||
          removeAccentedLetter(student.user.last_name)
            .replace(/\s+/g, "")
            .includes(removeAccentedLetter(query).replace(/\s+/g, ""))
        );
      })
    );
  }, [students, query]);

  const studentsList =
    filteredStudents &&
    filteredStudents.length > 0 &&
    filteredStudents.map((student) => (
      <CourseMemberExcerpt key={student.code} student={student} />
    ));

  const studentTable = filteredStudents ? (
    <table className="course-members__list">
      <thead>
        <tr>
          <th>Student ID</th>
          <th>Name</th>
          <th>Email</th>
          <th></th>
        </tr>
      </thead>
      <tbody>{studentsList}</tbody>
    </table>
  ) : (
    <h5 className="mt-4">Members not found</h5>
  );

  return status === "pending" ? <SpinnerComponent /> : studentTable;
};
export default CourseMembersList;
