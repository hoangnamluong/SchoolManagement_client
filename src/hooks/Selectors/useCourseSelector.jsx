import { useSelector } from "react-redux";
import {
  selectCourses,
  selectStatus,
  selectError,
} from "../../features/course/courseSlice";

const useCourseSelector = () => {
  const courses = useSelector(selectCourses);
  const status = useSelector(selectStatus);
  const error = useSelector(selectError);

  return { courses, status, error };
};
export default useCourseSelector;
