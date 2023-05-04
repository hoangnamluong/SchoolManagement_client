import "./courseMembers.scss";

import { useParams } from "react-router-dom";
import CourseMembersList from "../../../components/Course/CourseMembers/CourseMembersList";
import { useSelector } from "react-redux";
import { selectCourseById } from "../../../features/course/courseSlice";
import { useState } from "react";
import SearchForm from "../../../components/misc/SearchForm";

const CourseMembers = () => {
  const { courseId } = useParams();

  const [query, setQuery] = useState("");

  const course = useSelector((state) => selectCourseById(state, courseId));

  return (
    <div className="course-members">
      <div className="course-members__inner">
        <div className="course-members__title">
          <p className="m-0">
            {course && course.subject.id + " - " + course.subject.name}
          </p>
          <h1>Students</h1>
        </div>
        <div className="course-members__search">
          <SearchForm setValue={setQuery} placeholder="Student ID, Name" />
        </div>
        <CourseMembersList courseId={courseId} query={query} />
      </div>
    </div>
  );
};
export default CourseMembers;
