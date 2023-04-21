import "./courseDetail.scss";
import ITPic from "../../../assets/img/luca-bravo-XJXWbfSo2f0-unsplash.png";
import SchoolIcon from "@mui/icons-material/School";
import EmailIcon from "@mui/icons-material/Email";

const CourseDetailTitle = ({ course }) => {
  const { subject, course_class, teacher } = course;

  return (
    <div className="course-detail__title">
      <div className="title__content">
        <div className="title__content-header">
          <h2>{subject.name}</h2>
          <p>{course_class.faculty.name}</p>
        </div>
        <div className="title__content-body">
          <div>
            <SchoolIcon /> &nbsp;{" "}
            {teacher.user.first_name + " " + teacher.user.last_name}
          </div>
          <div>
            <EmailIcon /> &nbsp; {teacher.user.email}
          </div>
        </div>
      </div>
      <div
        className="title__hero"
        style={{ backgroundImage: `url(${ITPic})` }}
      ></div>
    </div>
  );
};
export default CourseDetailTitle;
