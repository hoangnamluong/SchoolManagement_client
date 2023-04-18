import LawPic from "../../assets/img/tingey-injury-law-firm-yCdPU73kGSc-unsplash.png";
import MathPic from "../../assets/img/jeswin-thomas-hecib2an4T4-unsplash.png";

import "./courses.scss";

import CourseExcerpt from "./CourseExcerpt";
import SpinnerComponent from "../misc/SpinnerComponent";

import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { memo, useEffect, useRef } from "react";
import useCourseSelector from "../../hooks/Selectors/useCourseSelector";
import { getAllCourse } from "../../features/course/courseSlice";

const CoursesList = () => {
  const dispatch = useDispatch();

  const { courses, error, status } = useCourseSelector();

  const runOnce = useRef(false);

  useEffect(() => {
    if (runOnce.current) return;

    if (status === "idle") dispatch(getAllCourse());

    return () => {
      runOnce.current = true;
    };
  }, []);

  console.log(courses);

  const coursesList = courses.map((course) => (
    <Link key={course.id}>
      <CourseExcerpt course={course} />
    </Link>
  ));

  return (
    <div className="courses-list">
      {status === "pending" && <SpinnerComponent />}
      {courses.length > 0 ? coursesList : <h3>So Empty</h3>}
    </div>
  );
};

const coursesListMemo = memo(CoursesList);
export default coursesListMemo;
