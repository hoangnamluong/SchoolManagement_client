import LoginForm from "../../components/auth/LoginForm";
import "./auth.scss";
import HomeIcon from "@mui/icons-material/Home";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <section className="auth">
      <div className="auth-form">
        <div>
          <LoginForm />
        </div>
        <p className="text-center">
          Create an acount?&nbsp;{" "}
          <Link to="/signup" className="fw-400">
            Signup
          </Link>
        </p>
        <Link className="home-redirect" to="/">
          <HomeIcon />
        </Link>
      </div>
      <div className="img"></div>
    </section>
  );
};
export default Login;
