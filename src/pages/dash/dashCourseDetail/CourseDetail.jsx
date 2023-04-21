import "./courseDetail.scss";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { selectCourseById } from "../../../features/course/courseSlice";
import { useEffect } from "react";
import CourseDetailTitle from "../../../components/Course/CourseDetail/CourseDetailTitle";
import CourseDetailTopics from "../../../components/Course/CourseDetail/CourseDetailTopics";
import CourseDetailLessons from "../../../components/Course/CourseDetail/CourseDetailLessons";

const CourseDetail = () => {
  const { courseId } = useParams();

  const course = useSelector((state) => selectCourseById(state, courseId));

  return (
    <>
      <div className="course-detail">
        <div className="course-detail__inner">
          <CourseDetailTitle course={course} />
          <CourseDetailTopics courseId={course.id} />
          <CourseDetailLessons />
        </div>
      </div>
    </>
  );
};
export default CourseDetail;
