import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { validateAuthCookie } from "../../utils/validateAuthCookie";
import PrimaryButton from "../PrimaryButton";

const HeaderHompage = () => {
  const [headerClass, setHeaderClass] = useState<boolean>(false);
  const [isLogedIn, setIsLogedIn] = useState<boolean>(false);
  const pathLocation = useLocation();
  const state: any = useSelector<any>(state => state.headerHeading)
  // console.log(state?.value)

  document.addEventListener('scroll', () => {
    if (window.pageYOffset >= 25) {
      setHeaderClass(true)
    } else {
      setHeaderClass(false)
    }
  })

  // check login status 
  useEffect(() => {
    validateAuthCookie()
      .then(isValid => {
        if (!isValid) {
          throw new Error("Tokken Expired!");
        }
        setIsLogedIn(true);
      })
      .catch(() => {
        setIsLogedIn(false);
      });
  }, []);

  return (
    <header className={`hompage-header text-capitalize ${headerClass && 'header-active'}`}>
      <div className="container-fluid px-md-5">
        <div className="d-flex justify-content-between align-items-center">
          <div className="logoBox">
            <Link to="/">
              <img src="/Img/logo.webp" alt="main-logo" />
            </Link>
          </div>
          <div className="dashboard-heading">
            {((!(pathLocation.pathname === '/') && isLogedIn) && state?.value) &&
              <h1 className="text-center text-light">{state?.value}</h1>
            }
          </div>
          <div className="btnBox">
            {((pathLocation.pathname === '/') && !isLogedIn) &&
              <PrimaryButton to="/login" outline={true} value="Sign In" />
            }
            {isLogedIn &&
              <Link to="/logout" className="btn btn-light">Logout</Link>
            }

          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderHompage;
