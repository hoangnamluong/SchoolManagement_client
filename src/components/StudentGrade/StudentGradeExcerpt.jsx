const StudentGradeExcerpt = ({ grade = null }) => {
  const marks = grade?.marks_detail || [];

  const finalMark = marks.find((mark) => mark.is_final === true);
  const midMarks = marks.filter((mark) => mark.is_midterm === true);

  return (
    grade && (
      <tr className="grades__table-item">
        <td>{grade.course.subject.id}</td>
        <td>{grade.course.subject.name}</td>
        <td>{finalMark ? finalMark.value : ""}</td>
        <td>{midMarks[0] ? midMarks[0].value : ""}</td>
        <td>{midMarks[1] ? midMarks[1].value : ""}</td>
        <td>{midMarks[2] ? midMarks[2].value : ""}</td>
        <td>{midMarks[3] ? midMarks[3].value : ""}</td>
        <td>{midMarks[4] ? midMarks[4].value : ""}</td>
        <td>{grade.mark_s10}</td>
        <td>{grade.mark_s4}</td>
      </tr>
    )
  );
};
export default StudentGradeExcerpt;
