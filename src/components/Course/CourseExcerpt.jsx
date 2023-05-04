import ClockIcon from "../../assets/svg/clock.svg";
import SchoolIcon from "../../assets/svg/teacher.svg";
import ITPic from "../../assets/img/luca-bravo-XJXWbfSo2f0-unsplash.png";
import Wave from "../../assets/svg/wave.svg";

import Moment from "react-moment";

import { useNavigate } from "react-router-dom";

import shortenName from "../../utils/shortenName";

const CourseExcerpt = ({ course }) => {
  const navigate = useNavigate();

  const { course_class, subject, teacher, start_date } = course;

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
        <p className="d-flex course-content__info">
          <span>
            <img src={ClockIcon} width={20} height={20} />
            <Moment locale="vi" format="DD MMM yyyy">
              {start_date}
            </Moment>
          </span>
          <span>
            <img src={SchoolIcon} width={20} height={20} />
            {fullname}
          </span>
        </p>
      </div>
    </div>
  );
};
export default CourseExcerpt;
