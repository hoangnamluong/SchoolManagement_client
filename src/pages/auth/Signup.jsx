import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import SignupForm from "../../components/auth/SignupForm";

const Signup = () => {
  return (
    <section className="auth">
      <div className="img signup-img"></div>
      <div className="auth-form">
        <div>
          <SignupForm />
        </div>
        <p className="text-center">
          Already have an account?&nbsp; <Link to="/login">Sign in</Link>
        </p>
        <Link className="home-redirect" to="/">
          <HomeIcon />
        </Link>
      </div>
    </section>
  );
};
export default Signup;
