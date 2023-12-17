import { useEffect } from "react";
import { signIn, fetchAuthSession, signOut } from "aws-amplify/auth";
import { useNavigate } from "react-router-dom";
import LoginPage from "../../views/pages/LoginPage";
import ResidentLoginModal from "../../views/modal/ResidentLoginModal";
import { useState } from "react";
const ResidentLoginPage = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [submit, setSubmit] = useState(false);
  const [isshowModal, setIsShowModal] = useState(false);
  const [isModalMessage, setIsModalMessage] = useState("");
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
      if (role === "isResident") {
        setIsModalMessage("Welcome to Resident dashboard.");
        setIsShowModal(true);
        setIsAdmin(true);
        setTimeout(() => {
          navigate("/resident-dashboard", { state: { user: userObject } });
        }, 5000);
      } else if (role === "isAdmin") {
        setIsModalMessage("This is Resident login page please log in as Admin");
        setIsShowModal(true);
        setTimeout(() => {
          handleSignOut();
        }, 5000);
      } else {
        handleSignOut();
      }
    } catch (error) {
      console.log("error signing in", error);
      if (error.code === "NotAuthorizedException") {
        setIsModalMessage("Incorrect username or password.");
        setIsShowModal(true);
      } else {
        setIsModalMessage("Incorrect username or password.");
        setIsShowModal(true);
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
        title="Resident Login"
        setUserName={setUserName}
        setPassword={setPassword}
        setSubmit={setSubmit}
        signOut={handleSignOut}
      />
      <ResidentLoginModal
        show={isshowModal}
        handleClose={() => setIsShowModal(false)}
        message={isModalMessage}
        isAdmin={isAdmin}
      />
    </div>
  );
};

export default ResidentLoginPage;
