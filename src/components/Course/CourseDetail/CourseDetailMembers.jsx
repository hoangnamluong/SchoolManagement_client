import { Link } from "react-router-dom";

const CourseDetailMembers = () => {
  return (
    <div className="course-detail__members mt-5">
      <div className="course-detail__section disable-select">
        <h3>Members</h3>
        <Link to={"members"}>View All</Link>
      </div>
    </div>
  );
};
export default CourseDetailMembers;
