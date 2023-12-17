/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "../../assets/img/r.png";
// react-bootstrap components
import {
  Nav,
} from "react-bootstrap";

function Sidebar({ routes, image, background }) {
  let location = useLocation();
  const [userCollapseState, setUserCollapseState] = React.useState(false);
  const [state, setState] = React.useState({});
  React.useEffect(() => {
    setState(getCollapseStates(routes));
  }, []);

  const getCollapseStates = (routes) => {
    let initialState = {};
    routes.map((prop, key) => {
      if (prop.collapse) {
        initialState = {
          [prop["state"]]: getCollapseInitialState(prop.views),
          ...getCollapseStates(prop.views),
          ...initialState,
        };
      }
      return null;
    });
    return initialState;
  };

  const getCollapseInitialState = (routes) => {
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].collapse && getCollapseInitialState(routes[i].views)) {
        return true;
      } else if (location.pathname === routes[i].layout + routes[i].path) {
        return true;
      }
    }
    return false;
  };
  const createLinks = (routes) => {
    return routes.map((prop, key) => {
      return (
        <Nav.Item
          className={activeRoute(prop.layout + prop.path)}
          key={key}
          as="li"
        >
          <Nav.Link to={prop.layout + prop.path} as={Link}>
            <div className="sidebar-icon">
              {prop.icon && <prop.icon size={21} />}{" "}
              {/* Render the icon component */}
              {prop.name && (
                <span className="sidebar-text my-auto pl-2 pt-2">
                  {prop.name}
                </span>
              )}
            </div>
          </Nav.Link>
        </Nav.Item>
      );
    });
  };

  const activeRoute = (routeName) => {
    return location.pathname === routeName ? "active" : "";
  };

  return (
    <>
      <div className="sidebar" data-color={background} data-image={image}>
        <div className="sidebar-wrapper">
          <div className="logo mb-3">
            <a
              className="simple-text logo-mini"
              href="http://www.creative-tim.com"
            >
              <div className="logo-img pb-5">
                <img className="border-radius" src={Logo} alt="react-logo" />
              </div>
            </a>
            <a
              className="simple-text logo-normal mt-2"
              href="http://www.creative-tim.com"
            >
              Admin Dashboard
            </a>
          </div>

          <Nav as="ul">{createLinks(routes)}</Nav>
        </div>
        <div
          className="sidebar-background"
          style={{
            backgroundImage: "url('" + image + "')",
          }}
        ></div>
      </div>
    </>
  );
}

// PropTypes and default props definitions

export default Sidebar;
