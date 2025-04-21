import React from "react";
import { Link, Outlet } from "react-router-dom";

export const UserLayout = () => {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 4fr" }}>
      <div style={{ border: "1px solid red", height: "90vh" }}>
        <h1>
          <Link to="/profile">Overview</Link>
        </h1>
        <h1>
          <Link to="/profile/personal-infos">PersonalInfos</Link>
        </h1>
        <h1>
          <Link to="/profile/edit-profile">EditProfile</Link>
        </h1>
      </div>
      <div style={{ border: "1px solid red", height: "90vh" }}>
        <Outlet />
      </div>
    </div>
  );
};
