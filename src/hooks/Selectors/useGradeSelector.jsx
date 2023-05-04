import { useSelector } from "react-redux";
import {
  selectCourseId,
  selectError,
  selectGradeLock,
  selectSelectedStudent,
  selectStatus,
  selectStudents,
} from "../../features/grade/gradeSlice";

const useGradeSelector = () => {
  const courseId = useSelector(selectCourseId);
  const students = useSelector(selectStudents);
  const selectedStudent = useSelector(selectSelectedStudent);
  const gradeLock = useSelector(selectGradeLock);
  const status = useSelector(selectStatus);
  const error = useSelector(selectError);

  return { courseId, students, selectedStudent, gradeLock, status, error };
};
export default useGradeSelector;
