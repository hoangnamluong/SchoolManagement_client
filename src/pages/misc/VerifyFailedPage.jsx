import { Link, useNavigate } from "react-router-dom";
import Brand from "../../assets/svg/education-school-study-sticker-8-svgrepo-com.svg";
import { useEffect } from "react";

const VerifyFailedPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/login", { replace: true });
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="absolute-center text-center ">
      <div className="w-100">
        <img src={Brand} width={200} height={200} />
      </div>
      <p className="fw-400 text-error">
        Your Email could not be verified. Please contact admin.
      </p>
      <p style={{ fontSize: "0.9em" }}>
        You will be redirect to the Login page in a few seconds <br /> Or <br />{" "}
        <Link
          to="/login"
          style={{ textDecoration: "underline" }}
          replace={true}
        >
          <b>Click here to redirect immediately</b>
        </Link>
      </p>
    </div>
  );
};
export default VerifyFailedPage;
