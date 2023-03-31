import LayersIcon from "@mui/icons-material/Layers";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

import Wave from "../../assets/svg/wave.svg";

const CourseExcerpt = ({ course }) => {
  return (
    <div className="course">
      <div
        className="course__img"
        style={{ backgroundImage: `url(${course.img})` }}
      >
        <span style={{ backgroundImage: `url(${Wave})` }}></span>
      </div>
      <div className="d-flex flex-column course__content">
        <div>
          <p>{course.department}</p>
          <h3>{course.title}</h3>
        </div>
        <p className="d-flex">
          <span>
            <LayersIcon /> {course.lessons} lessons
          </span>
          <span>
            <AccessTimeIcon /> 12 hr 4 min
          </span>
        </p>
      </div>
    </div>
  );
};
export default CourseExcerpt;
