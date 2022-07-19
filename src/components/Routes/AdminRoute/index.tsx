import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Outlet, useNavigate } from "react-router-dom";
import {
  UserDecodeTokken,
  SetUserTokken,
} from "../../../features/UserTokken/UserTokken";
import ScreenLoader from "../../shared/ScreenLoader";
import { validateAuthCookie } from "../../utils/validateAuthCookie";
import Cookie from "js-cookie";
import { useDispatch } from "react-redux";
import jwt_decode from "jwt-decode";

const AdminRoute = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(true);
  const [isLogedIn, setIsLogedIn] = useState<boolean>(false);

  const dispatch = useDispatch();

  const cookieKey = process.env.REACT_APP_AUTH_COOKIE;
  const authTokken: any = Cookie.get(cookieKey || "nothing");

  useEffect(() => {
    validateAuthCookie(true)
      .then((isValid) => {
        if (!isValid) {
          throw new Error("Tokken Expired!");
        }
        setLoading(false);
        setIsLogedIn(true);
        toast.success("Login SuccessFul");
        // decode jwt tokken
        const userInfoData: UserDecodeTokken = jwt_decode(authTokken);
        // console.log(userInfoData);
        // set user tokken in store container
        dispatch(SetUserTokken(userInfoData));
      })
      .catch((error: string) => {
        toast.error(error.toString());
        setIsLogedIn(false);
        navigate("/home");
      });
  }, []);

  return (
    <>
      <ScreenLoader isVisible={loading} />
      {isLogedIn && <Outlet />}
    </>
  );
};

export default AdminRoute;
