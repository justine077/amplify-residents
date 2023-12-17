import { useEffect } from "react";
import { signIn, fetchAuthSession, signOut } from "aws-amplify/auth";
import { useNavigate } from "react-router-dom";
import LoginPage from "../../views/pages/LoginPage";
import AdminLoginModal from "../../views/modal/AdminLoginModal";
import { useState } from "react";
const AdminLoginPage = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [submit, setSubmit] = useState(false);
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

  async function loginIn({ username, password }) {
    try {
      const user = await signIn({ username, password });
      const userObject = {
        username: username,
      };
      console.log(user);
      console.log("successully signed in");
      const currentSessionId = await fetchAuthSession();

      const role = currentSessionId.tokens.idToken.payload.preferred_username;
      if (role === "isAdmin") {
        setModalMessage("Welcome to Admin dashboard.");
        setShowModal(true);
        setIsAdmin(true);
        setTimeout(() => {
          navigate("/admin/dashboard", { state: { user: userObject } });
        }, 5000);
      } else if (role === "isResident") {
        setModalMessage("You are not authorized to access this page");
        setShowModal(true);
        setTimeout(() => {
          handleSignOut();
        }, 5000);
      } else {
        handleSignOut();
      }
    } catch (error) {
      console.log("error signing in", error);
      if (error.code === "NotAuthorizedException") {
        setModalMessage("Incorrect username or password.");
        setShowModal(true);
      } else {
        setModalMessage("Incorrect username or password.");
        setShowModal(true);
      }
    }
  }

  const onSubmit = (submission) => {
    const username = submission.data.username;
    const password = submission.data.password;
    loginIn({ username, password });
  };

  useEffect(() => {
    if (submit === true) {
      onSubmit({ data: { username: username, password: password } });
      setSubmit(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [submit]);

  return (
    <div>
      <LoginPage
        title="Admin Login"
        setUserName={setUserName}
        setPassword={setPassword}
        setSubmit={setSubmit}
        signOut={handleSignOut}
      />
      <AdminLoginModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        message={modalMessage}
        isAdmin={isAdmin}
      />
    </div>
  );
};

export default AdminLoginPage;
