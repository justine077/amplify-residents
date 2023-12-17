/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { React, useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { fetchAuthSession, signOut } from "aws-amplify/auth";
import AdminNavbar from "../components/Navbars/AdminNavbar";
import image4 from "../assets/img/full-screen-image-4.jpg";
import { Route, useLocation, useNavigate } from "react-router-dom";
import routes from "../routes";
import AuthModal from "../views/modal/AuthModal";

const AdminLayout = ({ children }) => {
  const [sidebarImage, setSidebarImage] = useState(image4);
  const [sidebarBackground, setSidebarBackground] = useState("black");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const navigate = useNavigate();

  async function handleSignOut() {
    try {
      await signOut();
      navigate("/");
    } catch (error) {
      console.log("error signing out: ", error);
    }
  }

  const fetchUserAttributes = async () => {
    try {
      const currentSessionId = await fetchAuthSession();
      const userPoolGroups =
        currentSessionId.tokens.accessToken.payload["cognito:groups"];

      if (userPoolGroups.includes("isAdmin")) {
        navigate("/admin/dashboard/add-new-resident");
      }

      setFirstName(currentSessionId.tokens.idToken.payload.given_name);

      try {
        setMiddleName(currentSessionId.tokens.idToken.payload.middle_name);
      } catch (error) {
        setMiddleName("");
      }

      setLastName(currentSessionId.tokens.idToken.payload.family_name);
    } catch (error) {
      console.error("Error fetching user attributes:", error);
      if (!firstName) {
        setModalMessage("You are not authorized to access this page");
        setShowModal(true);
        setTimeout(() => {
          handleSignOut();
        }, 3000);
      } else {
        setModalMessage(error + " please try again");
        setShowModal(true);
        setTimeout(() => {
          handleSignOut();
        }, 3000);
        navigate("/");
      }
    }
  };

  useEffect(() => {
    fetchUserAttributes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const location = useLocation();
  const isSidebarVisible =
    location.pathname === "/admin/dashboard/add-new-resident" ||
    location.pathname === "/admin/dashboard" ||
    location.pathname === "/admin/dashboard/resident-list-page";

  return (
    <div>
      <AuthModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        message={modalMessage}
        isAdmin={isAdmin}
      />
      <div className="wrapper">
        {isSidebarVisible && (
          <Sidebar
            routes={routes}
            image={sidebarImage}
            background={sidebarBackground}
            lastName={lastName}
            givenName={firstName}
          />
        )}
        <div className="main-panel">
          <AdminNavbar />
          <div className="content">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
