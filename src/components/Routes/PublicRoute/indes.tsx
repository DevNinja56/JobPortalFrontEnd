import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Outlet, useNavigate } from "react-router-dom";
import ScreenLoader from "../../shared/ScreenLoader";
import { validateAuthCookie } from "../../utils/validateAuthCookie";

type Props = {};

const PublicRoute = (props: Props) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(true);
  const [isNotLoggedIn, setIsNotLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    validateAuthCookie()
      .then((isValid) => {
        if (!isValid) {
          throw new Error("Tokken Expired!");
        }
        navigate("/home");
      })
      .catch((error: string) => {
        setLoading(false);
        setIsNotLoggedIn(true);
        console.log("not logged in yet!", error);
      });
  }, []);

  return (
    <>
      <ScreenLoader isVisible={loading} />
      {isNotLoggedIn && !loading && <Outlet />}
    </>
  );
};

export default PublicRoute;
