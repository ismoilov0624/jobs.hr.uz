import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const useScrollTop = (top = 0) => {
  const location = useLocation();
  React.useEffect(() => {
    window.scrollTo({ top, behavior: "smooth" });
  }, [location.pathname]);
};
