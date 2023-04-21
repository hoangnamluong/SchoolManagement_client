import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";

//pages
import Home from "./pages/home/Home";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import DashHome from "./pages/dash/dashHome/DashHome";
import CourseDetail from "./pages/dash/dashCourseDetail/CourseDetail";

//components
import FullPageLayout from "./components/Layout/FullPageLayout/FullPageLayout";
import ToTop from "./components/misc/ToTop";
import DashLayout from "./components/Layout/Dash/DashLayout";
import PublicLayout from "./components/Layout/PublicLayout/PublicLayout";
import PersistsLogin from "./components/auth/PersistsLogin";
import RequiredAuth from "./components/auth/RequiredAuth";
import CheckLoggedIn from "./components/auth/CheckLoggedIn";
import TopicDetail from "./pages/dash/dashTopic/TopicDetail";
import SpinnerComponent from "./components/misc/SpinnerComponent";

//lazy
const ProfileManagement = lazy(() =>
  import("./pages/dash/dashProfile/ProfileManagement")
);

function App() {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover
        theme="light"
      />
      <Routes>
        {/* Public */}
        <Route element={<CheckLoggedIn />}>
          <Route element={<FullPageLayout />}>
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
          </Route>
        </Route>

        <Route path="" element={<PublicLayout />}>
          <Route index element={<Home />} />
        </Route>

        {/* Private */}
        <Route element={<PersistsLogin />}>
          <Route element={<RequiredAuth />}>
            <Route path="user" element={<DashLayout />}>
              <Route path="home" element={<DashHome />} />
              {/* Course */}
              <Route path="courses">
                <Route path=":courseId" element={<CourseDetail />} />

                {/* Topic */}
                <Route
                  path=":courseId/topic/:topicId"
                  element={<TopicDetail />}
                />
              </Route>

              {/* Profile */}
              <Route
                path="profile"
                element={
                  <Suspense fallback={<SpinnerComponent />}>
                    <ProfileManagement />
                  </Suspense>
                }
              />
            </Route>
          </Route>
        </Route>
        {/* Dash end */}
      </Routes>
      <ToTop />
    </>
  );
}

export default App;
