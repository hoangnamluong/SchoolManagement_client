import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { CommentProvider } from "./context/CommentContext";
import { SidebarProvider } from "./context/SidebarContext";

//pages
import Home from "./pages/home/Home";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import DashHome from "./pages/dash/dashHome/DashHome";
import CourseDetail from "./pages/dash/dashCourseDetail/CourseDetail";

//components
import FullPageLayout from "./components/Layout/FullPageLayout/FullPageLayout";
import DashLayout from "./components/Layout/Dash/DashLayout";
import PublicLayout from "./components/Layout/PublicLayout/PublicLayout";
import PersistsLogin from "./components/auth/PersistsLogin";
import RequiredAuth from "./components/auth/RequiredAuth";
import CheckLoggedIn from "./components/auth/CheckLoggedIn";
import TopicDetail from "./pages/dash/dashTopic/TopicDetail";
import SpinnerComponent from "./components/misc/SpinnerComponent";
import RequiredRole from "./components/auth/RequiredRole";
import ROLE from "./data/ROLE";

//lazy
const ProfileManagement = lazy(() =>
  import("./pages/dash/dashProfile/ProfileManagement")
);
const CoursesListPage = lazy(() =>
  import("./pages/dash/dashCoursesList/CoursesListPage")
);
const CourseMembers = lazy(() =>
  import("./pages/dash/dashCourseMemebers/CourseMembers")
);
const GradingPage = lazy(() => import("./pages/dash/dashGrading/GradingPage"));
const GradePage = lazy(() => import("./pages/dash/dashGrade/GradePage"));
const Topics = lazy(() => import("./pages/dash/dashTopic/Topics"));
const PageNotFound = lazy(() => import("./pages/misc/PageNotFound"));
const VerifySuccessPage = lazy(() => import("./pages/misc/VerifySuccessPage"));
const VerifyFailedPage = lazy(() => import("./pages/misc/VerifyFailedPage"));

function App() {
  return (
    <>
      <ToastContainer
        position="top-center"
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

        <Route
          path="verify/succeed"
          element={
            <Suspense fallback={<SpinnerComponent />}>
              <VerifySuccessPage />
            </Suspense>
          }
        />
        <Route
          path="verify/failed"
          element={
            <Suspense fallback={<SpinnerComponent />}>
              <VerifyFailedPage />
            </Suspense>
          }
        />

        <Route element={<PublicLayout />}>
          <Route index element={<Home />} />
        </Route>

        {/* Private */}
        <Route element={<PersistsLogin />}>
          <Route element={<RequiredAuth />}>
            <Route element={<SidebarProvider />}>
              <Route path="user" element={<DashLayout />}>
                <Route path="home" element={<DashHome />} />
                {/* Course */}
                <Route path="courses">
                  <Route
                    index
                    element={
                      <Suspense fallback={<SpinnerComponent />}>
                        <CoursesListPage />
                      </Suspense>
                    }
                  />
                  <Route path=":courseId" element={<CourseDetail />} />

                  {/* Topic */}
                  <Route element={<CommentProvider />}>
                    <Route
                      path=":courseId/topic/:topicId"
                      element={<TopicDetail />}
                    />
                  </Route>

                  <Route
                    path=":courseId/topic"
                    element={
                      <Suspense fallback={<SpinnerComponent />}>
                        <Topics />
                      </Suspense>
                    }
                  />

                  {/* Teacher Grading */}
                  <Route element={<RequiredRole role={ROLE.TEACHER} />}>
                    <Route
                      path=":courseId/grading"
                      element={
                        <Suspense fallback={<SpinnerComponent />}>
                          <GradingPage />
                        </Suspense>
                      }
                    />
                  </Route>

                  {/* Members */}
                  <Route
                    path=":courseId/members"
                    element={
                      <Suspense fallback={<SpinnerComponent />}>
                        <CourseMembers />
                      </Suspense>
                    }
                  />
                </Route>

                {/* Student Grade */}
                <Route element={<RequiredRole role={ROLE.STUDENT} />}>
                  <Route
                    path="grades"
                    element={
                      <Suspense fallback={<SpinnerComponent />}>
                        <GradePage />
                      </Suspense>
                    }
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
        </Route>
        {/* Dash end */}

        <Route
          path="/*"
          element={
            <Suspense fallback={<SpinnerComponent />}>
              <PageNotFound />
            </Suspense>
          }
        />
      </Routes>
    </>
  );
}

export default App;
