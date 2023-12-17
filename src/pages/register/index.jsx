import { useState, useEffect } from "react";
import { signUp } from "aws-amplify/auth";
import { useNavigate } from "react-router-dom";
import RegisterPage from "../../views/pages/RegisterPage";

const RegistrationPage = () => {
  const [userName, setUserName] = useState("");
  const [givenName, setGivenName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [familyName, setFamilyName] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);

  const navigate = useNavigate();
  const register = async (
    username,
    password,
    given_name,
    middle_name,
    family_name
  ) => {
    try {
      const email = username;
      await signUp({
        username,
        password,
        options: {
          userAttributes: {
            email,
            given_name,
            middle_name,
            family_name,
            preferred_username: "isResident",
          },
        },
      });

      navigate("/confirmation-page", { state: { email: email } });
    } catch (error) {
      console.log("error signing up:", error);
    }
  };

  const onSubmit = (submission) => {
    register(
      submission.data.email,
      submission.data.password,
      submission.data.givenName,
      submission.data.middleName,
      submission.data.familyName
    );
  };

  useEffect(() => {
    if (isSubmit === true) {
      onSubmit({
        data: {
          email: userName,
          givenName: givenName,
          middleName: middleName,
          familyName: familyName,
          password: password,
        },
      });
      setIsSubmit(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmit]);

  return (
    <div>
      <RegisterPage
        setGivenName={setGivenName}
        setMiddleName={setMiddleName}
        setFamilyName={setFamilyName}
        setUserName={setUserName}
        setPassword={setPassword}
        setIsSubmit={setIsSubmit}
      />
    </div>
  );
};

export default RegistrationPage;
