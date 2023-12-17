import { useNavigate } from "react-router-dom";
import { fetchAuthSession } from "aws-amplify/auth";
import AdminPage from "../../layouts/Admin";
import AdminDashboardModal from "../../views/modal/AdminDashboardModal";
import { useState, useEffect } from "react";

const AdminDashboard = () => {
  const [isShowModal, setIsShowModal] = useState(false);
  const [isModalMessage, setIsModalMessage] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchUserAttributes() {
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

        if (!groupsPayload || !groupsPayload.includes("Admin")) {
          navigate("/admin/dashboard");
          return;
        }
      } catch (error) {
        console.error("Error fetching user attributes:", error);
        setIsModalMessage("Please log in first");
        setIsShowModal(true);
        setTimeout(() => {
          navigate("/");
        }, 3000);
      }
    }

    fetchUserAttributes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div>
        <AdminPage />
      </div>
      <AdminDashboardModal
        show={isShowModal}
        handleClose={() => setIsShowModal(false)}
        message={isModalMessage}
        isAdmin={isAdmin}
      />
    </>
  );
};

export default AdminDashboard;
