import "./global.scss";
import { Routes, Route } from "react-router-dom";
import { MainLayout } from "./layout/main-layout/main-layout";
import { Home } from "./pages/home/home";
import { About } from "./pages/about/about";
import Jobs from "./pages/jobs/jobs";
import Companies from "./pages/companies/companies";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

function App() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);
  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/companies" element={<Companies />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
