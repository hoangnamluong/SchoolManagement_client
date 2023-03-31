import LawPic from "../../assets/img/tingey-injury-law-firm-yCdPU73kGSc-unsplash.png";
import MathPic from "../../assets/img/jeswin-thomas-hecib2an4T4-unsplash.png";
import ITPic from "../../assets/img/luca-bravo-XJXWbfSo2f0-unsplash.png";

import "./courses.scss";

import CourseExcerpt from "./CourseExcerpt";
import { Link } from "react-router-dom";

const courses = [
  {
    id: 1,
    title: "Basic of Algorithm & Data Structures",
    content: "",
    img: ITPic,
    lessons: 12,
    department: "Information Technology",
  },
  {
    id: 2,
    title: "Law is in your Hands",
    content: "",
    img: LawPic,
    lessons: 10,
    department: "Law",
  },
  {
    id: 3,
    title: "Advances Math",
    content: "",
    img: MathPic,
    lessons: 20,
    department: "Information Technology",
  },
];

const CoursesList = () => {
  const coursesList = courses.map((course) => (
    <Link key={course.id}>
      <CourseExcerpt course={course} />
    </Link>
  ));

  return <div className="courses-list">{coursesList}</div>;
};
export default CoursesList;
