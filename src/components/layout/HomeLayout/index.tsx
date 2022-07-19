import React, { createContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import HomeFooter from "../../shared/HomeFooter";
import HomeHeader from "../../shared/HomeHeader";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import { Toaster } from "react-hot-toast";

type HomeLayoutProps = {
  children?: React.ReactElement;
};

const HomeLayout = ({ children }: HomeLayoutProps) => {
  const [scrolTop, setScrolTop] = useState<boolean>(false);
  const location = useLocation();
  const scrolToTop = () => window.scrollTo(0, 0);
  useEffect(() => scrolToTop(), [location]);
  document.addEventListener("scroll", () => {
    if (window.pageYOffset >= 500) {
      setScrolTop(true);
    } else {
      setScrolTop(false);
    }
  });

  console.log("eviroment is -->", process.env.NODE_ENV);

  return (
    <div className="homeLayout">
      <Toaster />
      <button
        onClick={scrolToTop}
        className={`scrolToTop ${scrolTop && "show"}`}
      >
        <ArrowCircleUpIcon />
      </button>
      <HomeHeader />
      <main>{children}</main>
      <HomeFooter />
    </div>
  );
};

export default HomeLayout;
