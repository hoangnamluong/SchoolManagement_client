import "./grades.scss";

import StudentGradeList from "../../../components/StudentGrade/StudentGradeList";

const GradePage = () => {
  return (
    <div className="grades">
      <div className="grades__inner">
        <div className="grades__title">
          <h1>Grades</h1>
        </div>
        <div className="grades__list">
          <StudentGradeList />
        </div>
      </div>
    </div>
  );
};
export default GradePage;
