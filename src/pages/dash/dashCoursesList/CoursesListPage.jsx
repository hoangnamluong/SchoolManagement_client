import "./coursesListPage.scss";

import CoursesList from "../../../components/Course/CoursesList";
import SearchForm from "../../../components/misc/SearchForm";
import { useState } from "react";

const CoursesListPage = () => {
  const [query, setQuery] = useState("");

  return (
    <div className="courses-list-page">
      <div className="courses-list-page__inner">
        <div className="courses-list-page__title">
          <h1>Your Courses</h1>
        </div>
        <div className="courses-list-page__search">
          <SearchForm setValue={setQuery} placeholder="Subject Name, Class" />
        </div>
        <div className="courses-list-page__courses">
          <CoursesList query={query} />
        </div>
      </div>
    </div>
  );
};
export default CoursesListPage;
