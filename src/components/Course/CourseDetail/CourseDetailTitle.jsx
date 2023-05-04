import "./courseDetail.scss";

import ITPic from "../../../assets/img/luca-bravo-XJXWbfSo2f0-unsplash.png";
import SchoolIcon from "@mui/icons-material/School";
import EmailIcon from "@mui/icons-material/Email";
import ChatIcon from "../../../assets/svg/chat3.svg";

import { useDispatch } from "react-redux";
import { setPartner, toggleIsOpen } from "../../../features/chat/chatSlice";

const CourseDetailTitle = ({ course }) => {
  const dispatch = useDispatch();

  const { subject, course_class, teacher } = course;

  const handleClickedChatIcon = () => {
    dispatch(setPartner(teacher.user));
    dispatch(toggleIsOpen());
  };

  return (
    <div className="course-detail__title">
      <div className="title__content">
        <div className="title__content-header">
          <h1>{subject.name}</h1>
          <p>{course_class.faculty.name}</p>
        </div>
        <div className="title__content-body">
          <div>
            <div className="mb-2">
              <SchoolIcon /> &nbsp;{" "}
              {teacher.user.first_name + " " + teacher.user.last_name}
            </div>
            <div>
              <EmailIcon /> &nbsp; {teacher.user.email}
            </div>
          </div>
          <img
            src={ChatIcon}
            width={40}
            height={40}
            onClick={handleClickedChatIcon}
            className="cursor-pointer"
          />
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
