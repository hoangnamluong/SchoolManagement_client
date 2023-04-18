import LoginForm from "../../components/auth/LoginForm";
import "./auth.scss";
import Google from "../../assets/svg/google.svg";
import HomeIcon from "@mui/icons-material/Home";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <section className="auth">
      <div className="auth-form">
        <div>
          <LoginForm />
          <p>Or</p>
          <button className="google-full">
            <img src={Google} width={30} height={30} />
            &nbsp; Sign in with google
          </button>
          <button className="google-short">
            <img src={Google} width={30} height={30} />
            &nbsp; Google
          </button>
        </div>
        <p className="text-center">
          Create an acount?&nbsp; <Link to="/signup">Signup</Link>
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
