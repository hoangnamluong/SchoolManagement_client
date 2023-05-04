import "./courseDetail.scss";

import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { selectCourseById } from "../../../features/course/courseSlice";
import useAuthSelector from "../../../hooks/Selectors/useAuthSelector";

import ROLE from "../../../data/ROLE";

import CourseDetailTitle from "../../../components/Course/CourseDetail/CourseDetailTitle";
import CourseDetailTopics from "../../../components/Course/CourseDetail/CourseDetailTopics";
import CourseDetailLessons from "../../../components/Course/CourseDetail/CourseDetailLessons";
import CourseDetailMembers from "../../../components/Course/CourseDetail/CourseDetailMembers";

const CourseDetail = () => {
  const { courseId } = useParams();

  const { userInfo } = useAuthSelector();

  const course = useSelector((state) => selectCourseById(state, courseId));

  return (
    <>
      <div className="course-detail">
        <div className="course-detail__inner">
          <CourseDetailTitle course={course} />
          {userInfo.role === ROLE.TEACHER && (
            <Link to={`grading`}>
              <button className="primary-btn w-100 mt-4">Grading</button>
            </Link>
          )}
          <CourseDetailMembers />
          <CourseDetailTopics />
          <CourseDetailLessons />
        </div>
      </div>
    </>
  );
};
export default CourseDetail;
