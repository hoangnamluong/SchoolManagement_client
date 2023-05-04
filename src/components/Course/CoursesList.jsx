import LawPic from "../../assets/img/tingey-injury-law-firm-yCdPU73kGSc-unsplash.png";
import MathPic from "../../assets/img/jeswin-thomas-hecib2an4T4-unsplash.png";

import "./courses.scss";

import CourseExcerpt from "./CourseExcerpt";
import SpinnerComponent from "../misc/SpinnerComponent";

import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { memo, useEffect, useMemo, useRef } from "react";
import useCourseSelector from "../../hooks/Selectors/useCourseSelector";
import { getAllCourse } from "../../features/course/courseSlice";

import removeAccentedLetter from "../../utils/removeAccentedLetter";

const CoursesList = ({ query = "" }) => {
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

  const filteredCourses =
    useMemo(() => {
      if (courses.length > 0) {
        return courses.filter((course) => {
          return removeAccentedLetter(course.subject.name)
            .replace(/\s+/g, "")
            .includes(removeAccentedLetter(query).replace(/\s+/g), "");
        });
      }
    }, [courses, query]) ?? [];

  const coursesList = filteredCourses.map((course) => (
    <div key={course.id}>
      <CourseExcerpt course={course} />
    </div>
  ));

  return (
    <div className="courses-list">
      {status === "pending" && <SpinnerComponent />}
      {status === "fulfilled" &&
        (filteredCourses.length > 0 ? coursesList : <h3>Courses not found</h3>)}
      {status === "rejected" && <h3>Could not get Courses</h3>}
    </div>
  );
};

const coursesListMemo = memo(CoursesList);
export default coursesListMemo;
