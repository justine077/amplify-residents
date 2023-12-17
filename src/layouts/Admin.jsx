/* eslint-disable no-unused-vars */
import React from "react";
import { Routes, Route } from "react-router-dom";
// react-bootstrap components

// core components
import Sidebar from "../components/Sidebar";
import AdminNavbar from "../components/Navbars/AdminNavbar";
import FixedPlugin from "../components/FixedPlugin/FixedPlugin";

// dinamically create dashboard routes
import routes from "../routes";

import image1 from "../assets/img/full-screen-image-1.jpg";
import image2 from "../assets/img/full-screen-image-2.jpg";
import image3 from "../assets/img/full-screen-image-3.jpg";
import image4 from "../assets/img/full-screen-image-4.jpg";
import Dashboard from "../views/Dashboard";

function Admin() {
  const [sidebarImage, setSidebarImage] = React.useState(image3);
  const [sidebarBackground, setSidebarBackground] = React.useState("black");
  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.collapse) {
        return getRoutes(prop.views);
      }
      if (prop.layout === "/admin") {
        return (
          <Route
            path={prop.layout + prop.path}
            key={key}
            component={prop.component}
          />
        );
      } else {
        return null;
      }
    });
  };
  return (
    <>
      <div className="wrapper ">
        <Sidebar
          routes={routes}
          image={sidebarImage}
          background={sidebarBackground}
        />
        <div className="main-panel">
          <AdminNavbar />
          <div className="content">
            <Routes>{getRoutes(routes)}</Routes>
            <div>
              <Dashboard />
            </div>
          </div>
        </div>
      </div>
      <FixedPlugin
        setSidebarImageParent={(value) => setSidebarImage(value)}
        sidebarDefaultImage={sidebarImage}
        sidebarImages={[image1, image2, image3, image4]}
        backgroundColors={[
          "black",
          "azure",
          "green",
          "orange",
          "red",
          "purple",
        ]}
        backgroundColor={sidebarBackground}
        setSidebarBackgroundParent={(value) => setSidebarBackground(value)}
      />
    </>
  );
}

export default Admin;
