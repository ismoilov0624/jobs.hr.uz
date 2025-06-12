"use client";

import "./global.scss";
import { Routes, Route } from "react-router-dom";
import { MainLayout } from "./layout/main-layout/main-layout";

import { Home } from "./pages/home/home";
import { About } from "./pages/about/about";
import Jobs from "./pages/jobs/jobs";
import JobDetail from "./pages/job-detail/job-detail";
import OrganizationDetail from "./pages/organization-detail/organization-detail";
import Companies from "./pages/companies/companies";
import { Signup } from "./pages/auth/signup/signup";
import { Login } from "./pages/auth/login/login";
import { UserLayout } from "./layout/user-layout/user-layout";
import Overview from "./pages/user/overview/overview";
import { EditProfile } from "./pages/user/edit-profile/edit-profile";
import { ProfileInfo } from "./pages/user/profile-sections/profile-info";
import { PrivateInfo } from "./pages/user/profile-sections/private-info";
import { Languages } from "./pages/user/profile-sections/languages";
import { Education } from "./pages/user/profile-sections/education";
import { Experience } from "./pages/user/profile-sections/experience";
import { Relatives } from "./pages/user/profile-sections/relatives";
import Applications from "./pages/user/applications/applications";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import PersonalInfos from "./pages/user/personal-infos/personal-infos";
import { ToastContainer } from "react-toastify";
import { Verify } from "./pages/auth/verify/verify";
import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";

// Protected Route Component - faqat profile uchun
const ProtectedRoute = ({ children }) => {
  const isLoggedIn = !!Cookies.get("user_token");

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

function App() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <>
      <ToastContainer />
      <Routes>
        {/* Public routes - MainLayout ichida */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="jobs" element={<Jobs />} />
          <Route path="jobs/:jobId" element={<JobDetail />} />
          <Route path="companies" element={<Companies />} />
          <Route
            path="organizations/:organizationId"
            element={<OrganizationDetail />}
          />

          <Route
            path="profile/personal-infos/:userId"
            element={<PersonalInfos />}
          />
        </Route>

        {/* Auth routes - MainLayout tashqarisida */}
        <Route path="signup" element={<Signup />} />
        <Route path="verify" element={<Verify />} />
        <Route path="login" element={<Login />} />

        {/* Protected user routes - alohida */}
        <Route
          path="profile"
          element={
            <ProtectedRoute>
              <UserLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Overview />} />
          <Route path="applications" element={<Applications />} />
          <Route path="personal-infos" element={<PersonalInfos />} />
          <Route path="edit-profile" element={<EditProfile />} />
          <Route path="information" element={<ProfileInfo />} />
          <Route path="private-info" element={<PrivateInfo />} />
          <Route path="languages" element={<Languages />} />
          <Route path="education" element={<Education />} />
          <Route path="experience" element={<Experience />} />
          <Route path="relatives" element={<Relatives />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
