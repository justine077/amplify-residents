import { useState, useEffect } from "react";
import { fetchAuthSession } from "aws-amplify/auth";
import { useNavigate } from "react-router-dom";
import ResidentDashboardModal from "../../views/modal/ResidentDashboardModal";
import UserPage from "../../views/pages/UserPage";
import AuthNavbar from "../../components/Navbars/AuthNavbar";
const ResidentDashboard = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [isshowModal, setIsShowModal] = useState(false);
  const [isModalMessage, setIsModalMessage] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserAttributes = async () => {
      try {
        const currentSessionId = await fetchAuthSession();
        const accessToken = currentSessionId.tokens?.accessToken;

        if (!accessToken) {
          setIsModalMessage("Access token is unavailable. Please log in.");
          setIsShowModal(true);
          setIsAdmin(true);
          setTimeout(() => {
            navigate("/");
          }, 3000);

          return;
        }

        const groupsPayload = accessToken.payload?.["cognito:groups"];

        if (!groupsPayload || !groupsPayload.includes("Resident")) {
          navigate("/resident-dashboard");
          return;
        }

        setFirstName(currentSessionId.tokens.idToken.payload.given_name);
        try {
          setMiddleName(
            currentSessionId.tokens.idToken.payload.middle_name || ""
          );
        } catch (error) {
          setMiddleName("");
        }
        setLastName(currentSessionId.tokens.idToken.payload.family_name);
        setEmail(currentSessionId.tokens.idToken.payload.email);

        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching user attributes:", error);
        setIsModalMessage("Please log in first");
        setIsShowModal(true);
        setTimeout(() => {
          navigate("/");
        }, 3000);
      }
    };

    fetchUserAttributes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <AuthNavbar
        firstName={firstName}
        middleName={middleName}
        lastName={lastName}
      />
      <div>
        <h1>Resident Dashboard</h1>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <span>
            Welcome {firstName} {middleName} {lastName} ({email})
          </span>
        )}
      </div>
      <ResidentDashboardModal
        show={isshowModal}
        handleClose={() => setIsShowModal(false)}
        message={isModalMessage}
        isAdmin={isAdmin}
      />
      <UserPage
        firstName={firstName}
        middleName={middleName}
        lastName={lastName}
        email={email}
      />
    </>
  );
};

export default ResidentDashboard;
