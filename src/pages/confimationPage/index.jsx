import { useNavigate, useLocation, Link } from "react-router-dom";
import { confirmSignUp } from "aws-amplify/auth";
import { Form } from "react-formio";
import { BsChevronLeft } from "react-icons/bs";

const ConfirmationPage = () => {
  const location = useLocation();
  let confirmEmail = "";
  try {
    confirmEmail = location.state.email;
  } catch (error) {
    confirmEmail = "";
  }

  const navigate = useNavigate();

  const onSubmit = async (submission) => {
    console.log("Form submitted:", submission);
    console.log("Submission data:", submission.data);

    const formFields = submission.data;
    let username, confirmationCode;

    for (const key in formFields) {
      if (key === "email") {
        username = formFields[key];
      } else if (key === "confirmationCode") {
        confirmationCode = formFields[key];
      }
    }

    if (username && confirmationCode) {
      console.log({ username, confirmationCode });
      console.log("Username to be confirmed:", username);
      try {
        await confirmSignUp({ username, confirmationCode });
        console.log("Successfully signed up");
        navigate("/resident-login");
      } catch (error) {
        console.log("Error confirming sign up", error.message); // Log error message
        // Display error message to the user or handle appropriately
      }
    } else {
      console.log("Missing username or confirmationCode in form submission");
      // Handle missing data
    }
  };

  return (
    <div
      className="container d-flex align-items-center justify-content-center "
      style={styles.height}
    >
      <div
        className="d-flex flex-column align-items-center w-50"
        style={styles.container}
      >
        <h2 className="mt-5"></h2>
        <h2>Verify Your Account</h2>
        {confirmEmail ? (
          <p className="w-75 text-center mt-3">
            Please verify your email, <strong>{confirmEmail}</strong>, by
            checking for a verification code in your email inbox. Remember to
            also review your spam folder for the confirmation code.
          </p>
        ) : null}
        <div
          style={{ maxWidth: "60%", minWidth: "60%" }}
          className="bg-transparent"
        >
          <Form
            src={"https://pigeyxktwusgunk.form.io/verificationcode"}
            onSubmit={onSubmit}
          />
        </div>
        <div className="d-flex justify-content-center align-items-center">
          <Link
            to="/"
            style={styles.textColor}
            className="cursor-pointer text-decoration-none  pb-5 pt-3 d-flex align-items-center justify-content-center text-center"
            onClick={() => navigate("/")}
          >
            <BsChevronLeft size={18} />
            <span style={{ fontSize: "16px" }}>Back to Landing Page</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: "#FDF0D5",
  },
  textColor: {
    color: "#D7872D",
  },
  height: {
    height: "100vh",
  },
};
export default ConfirmationPage;
