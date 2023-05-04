import { memo } from "react";

import { useDispatch, useSelector } from "react-redux";

import {
  selectSelectedStudent,
  selectStudents,
  setSelectedStudent,
} from "../../features/grade/gradeSlice";

const StudentExcerpt = ({ student = null }) => {
  const dispatch = useDispatch();

  const studentInfo = student.student;
  const marks = student.marks_detail;

  const students = useSelector(selectStudents);
  const selectedStudent = useSelector(selectSelectedStudent);

  const index = students.mark_list.findIndex((s) => s === student);

  const name = studentInfo.user.first_name.concat(
    " ",
    studentInfo.user.last_name
  );

  const finalMark = marks.find((mark) => mark.is_final === true);
  const midMarks = marks.filter((mark) => mark.is_midterm === true);

  const handleStudentClicked = () => {
    if (
      student.student.code !== selectedStudent?.student?.code ||
      !selectedStudent
    ) {
      let mid = [];

      midMarks.forEach((midMark) => {
        return mid.push({ value: midMark.value, id: midMark?.id || -1 });
      });

      dispatch(
        setSelectedStudent({
          student: {
            idx: index,
            id: student.id,
            student: student.student,
            marks_detail: {
              final: {
                value: finalMark ? finalMark.value : "",
                id: finalMark?.id || -1,
              },
              midterm: mid,
            },
          },
        })
      );
    }
  };

  return (
    student && (
      <tr className="students__table-item" onClick={handleStudentClicked}>
        <td>{studentInfo.code}</td>
        <td>{name}</td>
        <td>{finalMark ? finalMark.value : ""}</td>
        <td>{midMarks[0] ? midMarks[0].value : ""}</td>
        <td>{midMarks[1] ? midMarks[1].value : ""}</td>
        <td>{midMarks[2] ? midMarks[2].value : ""}</td>
        <td>{midMarks[3] ? midMarks[3].value : ""}</td>
        <td>{midMarks[4] ? midMarks[4].value : ""}</td>
        <td>{student.mark_s10}</td>
        <td>{student.mark_s4}</td>
      </tr>
    )
  );
};

const studentMemo = memo(StudentExcerpt);

export default studentMemo;
