import { CSVLink } from "react-csv";
import { useSelector } from "react-redux";
import { selectStudents } from "../../features/grade/gradeSlice";
import { useParams } from "react-router-dom";

import { selectCourseById } from "../../features/course/courseSlice";

const ExportGradeCSV = ({ children }) => {
  const { courseId } = useParams();
  const course = useSelector((state) => selectCourseById(state, courseId));

  const students = useSelector(selectStudents);

  const studentsMarks = students?.mark_list || [];

  const headers = [
    { label: "id", key: "id" },
    { label: "Student_Id", key: "studentId" },
    { label: "First_Name", key: "firstName" },
    { label: "Last_Name", key: "lastName" },
    { label: "Final", key: "finalMark" },
    { label: "Midterm", key: "midMark" },
  ];

  const data =
    studentsMarks &&
    studentsMarks.map((student) => {
      let mid = [];
      let final = student.marks_detail.find((mark) => mark.is_final === true);
      student.marks_detail.map((mark) => {
        if (mark.is_midterm === true) {
          mid.push(mark?.value || "");
        }
      });

      return {
        id: student.id,
        studentId: student.student.code,
        firstName: student.student.user.first_name,
        lastName: student.student.user.last_name,
        finalMark: final ? final.value : "",
        midMark: mid,
      };
    });

  const csvReport = {
    data,
    headers,
    filename: `${course.subject.id}_report.csv`,
  };

  return (
    <CSVLink {...csvReport} className="d-block px-3 py-1">
      CSV
    </CSVLink>
  );
};
export default ExportGradeCSV;
