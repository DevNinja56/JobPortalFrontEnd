import React, { useState } from "react";
import AsideDash from "../../pages/Dashboard/Aside";
import HomeLayout from "../HomeLayout";
import MenuIcon from "@mui/icons-material/Menu";

type AdminLayoutProps = {
  children?: React.ReactElement;
};

const adminMenu = [
  {
    hasChildMenu: false,
    data: { link: "/admin", heading: "User Listing" },
  },
];

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const [isactiveAside, setIsActiveAside] = useState<boolean>(false);
  return (
    <>
      <section>
        <HomeLayout>
          <>
            <button
              style={{
                color: "#fff",
                position: "fixed",
                top: "-7px",
                right: "10px",
                fontSize: "35px",
                border: "none",
                cursor: "pointer",
                background: "none",
                zIndex: "22",
              }}
              className="menuBtn"
              onClick={() =>
                isactiveAside ? setIsActiveAside(false) : setIsActiveAside(true)
              }
            >
              <MenuIcon />
            </button>
            <section
              className={`dashboard ${isactiveAside && "sideBarActive"}`}
            >
              <div className="main-dashboard-menue">
                <AsideDash menuItems={adminMenu} />
                <div className="right-side-dashboard-menu">
                  <>{children}</>
                </div>
              </div>
            </section>
          </>
        </HomeLayout>
      </section>
    </>
  );
};

export default AdminLayout;
