import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <section className="background-secondary-gradient text-light">
      <div className="absolute-center text-center">
        <h1 style={{ fontSize: "5em" }}>404</h1>
        <p className="fw-400 mt-4">
          Page Not Found. Click{" "}
          <Link to={-1} className="primary-btn p-2 rounded">
            Here
          </Link>{" "}
          To Return To Home Page
        </p>
      </div>
    </section>
  );
};
export default PageNotFound;
