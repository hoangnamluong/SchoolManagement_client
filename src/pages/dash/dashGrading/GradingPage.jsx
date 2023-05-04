import "./grading.scss";

import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { selectCourseById } from "../../../features/course/courseSlice";

import StudentsList from "../../../components/Grading/StudentsList";
import GradingForm from "../../../components/Grading/GradingForm";
import GradingAction from "../../../components/Grading/GradingAction";

const GradingPage = () => {
  const { courseId } = useParams();

  const course = useSelector((state) => selectCourseById(state, courseId));

  return (
    <div className="grading">
      <div className="grading__inner">
        <div className="grading__title">
          <p className="m-0">
            {course && course.subject.id + " - " + course.subject.name}
          </p>
          <h1>Grading</h1>
        </div>
        <div className="grading__students">
          <StudentsList />
          <div className="grading__actions">
            <GradingForm />
            <div></div>
            <GradingAction />
          </div>
        </div>
      </div>
    </div>
  );
};
export default GradingPage;
