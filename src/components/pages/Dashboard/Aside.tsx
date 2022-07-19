import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { nanoid } from "@reduxjs/toolkit";

type Props = {
  menuItems?: any[];
};

// props arra
// [linkData]
//linkData - > hasChildMenu == true  [ link , heading] else link , heading

const simpleUserMenu = [
  { hasChildMenu: false, data: { link: "/home", heading: "Source Code" } },

  {
    hasChildMenu: true,
    heading: "Challenges",
    rootLink: "/challenges/practice",
    data: [
      { link: "/challenges/practice", heading: "Practice Challenge" },
      { link: "/challenges/cash", heading: "Cash Challenge" },
    ],
  },
  {
    hasChildMenu: false,
    data: { link: "/sub-dic", heading: "Submissions / Discussions" },
  },
  { hasChildMenu: false, data: { link: "/profile", heading: "Profile" } },
];

const AsideDash = ({ menuItems = simpleUserMenu }: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [isOpen2, setIsOpen2] = useState<boolean>(false);
  const [isActive, setIsActive] = useState<boolean>(false);
  const RouteHistory = useLocation();

  useEffect(() => {
    const allCondition =
      RouteHistory.pathname === "/challenges" ||
      RouteHistory.pathname === "/challenges/practice" ||
      RouteHistory.pathname === "/challenges/cash";
    RouteHistory.pathname === "/challenges/cash" && setIsActive(true);
    if (allCondition) {
      setIsOpen2(true);
      setIsOpen(true);
    }
  }, []);

  const dropDownFun = () => {
    isOpen2 && setIsOpen2(false);
    isOpen ? setIsOpen(false) : setIsOpen(true);
  };
  return (
    <>
      <aside>
        <nav>
          <ul>
            {menuItems.map((item) => (
              <li key={nanoid()}>
                {!item.hasChildMenu ? (
                  <NavLink to={item.data.link}>{item.data.heading}</NavLink>
                ) : (
                  <>
                    <NavLink
                      to={item.rootLink}
                      className={` ${
                        isOpen ? "dropDown_enable" : "dropDown_disable"
                      } ${isOpen2 && "showFirstTimeDopDown"} ${
                        isActive && "active"
                      }`}
                      onClick={dropDownFun}
                    >
                      {item.heading}
                    </NavLink>
                    <span onClick={dropDownFun}>
                      <KeyboardArrowDownIcon />
                    </span>
                    <ul>
                      {item.data.map((subItem: any) => (
                        <li key={nanoid()}>
                          <NavLink to={subItem.link}>{subItem.heading}</NavLink>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </li>
            ))}

            {/* <li>
              <NavLink to={"/home"}>Source Code</NavLink>
            </li>
            <li>
              <NavLink
                to={"/challenges/practice"}
                className={` ${
                  isOpen ? "dropDown_enable" : "dropDown_disable"
                } ${isOpen2 && "showFirstTimeDopDown"} ${isActive && "active"}`}
                onClick={dropDownFun}
              >
                Challenges
              </NavLink>
              <span onClick={dropDownFun}>
                <KeyboardArrowDownIcon />
              </span>
              <ul>
                <li>
                  <NavLink to={"/challenges/practice"}>
                    Practice Challenge
                  </NavLink>
                </li>
                <li>
                  <NavLink to={"/challenges/cash"}>Cash Challenge</NavLink>
                </li>
              </ul>
            </li>
            <li>
              <NavLink to={"/sub-dic"}>Submissions / Discussions</NavLink>
            </li>
            <li>
              <NavLink to={"/Profile"}>Profile</NavLink>
            </li> */}
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default AsideDash;
