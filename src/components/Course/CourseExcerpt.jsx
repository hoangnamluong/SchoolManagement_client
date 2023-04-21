import LayersIcon from "@mui/icons-material/Layers";
import SchoolIcon from "@mui/icons-material/School";

import ITPic from "../../assets/img/luca-bravo-XJXWbfSo2f0-unsplash.png";

import Wave from "../../assets/svg/wave.svg";
import shortenName from "../../utils/shortenName";
import { useNavigate } from "react-router-dom";

const CourseExcerpt = ({ course }) => {
  const navigate = useNavigate();

  const { course_class, subject, teacher } = course;

  const fullname = shortenName(teacher.user.first_name, teacher.user.last_name);

  const handleCourseClick = (e) => {
    navigate(`/user/courses/${course.id}`);
  };

  return (
    <div className="course" onClick={handleCourseClick}>
      <div className="course__img" style={{ backgroundImage: `url(${ITPic})` }}>
        <span style={{ backgroundImage: `url(${Wave})` }}></span>
      </div>
      <div className="d-flex flex-column course__content">
        <div>
          <p>{course_class.faculty.name}</p>
          <h3>{subject.name}</h3>
        </div>
        <p className="d-flex">
          <span>
            <LayersIcon /> 12 lessons
          </span>
          <span>
            <SchoolIcon /> {fullname}
          </span>
        </p>
      </div>
    </div>
  );
};
export default CourseExcerpt;
