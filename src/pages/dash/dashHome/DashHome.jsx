//svg
import HiSvg from "../../../assets/svg/undraw_welcoming_re_x0qo.svg";
import CoursesList from "../../../components/Course/CoursesList";

//scss
import "./dashHome.scss";

const DashHome = () => {
  return (
    <div className="dash-home">
      <div className="dash-home__inner">
        <div className="dash-home__title">
          <img src={HiSvg} alt="Welcome" />
          <h1>Welcome Back, Líu Líu rẻ gách</h1>
        </div>
        <div className="dash-home__courses">
          <h2>Courses</h2>
          <div className="dash-home__courses-list mt-4">
            <CoursesList />
          </div>
        </div>
      </div>
    </div>
  );
};
export default DashHome;
