/* eslint-disable react/prop-types */
import { useState } from "react";

const ResidentForm = ({ formState, handleInputChange, addNewResident }) => {
  const [error, setError] = useState("");

  const validateFields = () => {
    for (const key in formState) {
      if (!formState[key]) {
        setError(
          `Please fill in ${key.charAt(0).toUpperCase() + key.slice(1)}`
        );
        return false;
      }
    }
    setError("");
    return true;
  };

  const handleCreateResident = () => {
    const isValid = validateFields();
    if (isValid) {
      addNewResident();
    }
  };

  return (
    <div>
      <div style={styles.formContainer}>
        <h2>Create Resident</h2>
        {Object.entries(formState).map(([key, value]) => (
          <input
            key={key}
            onChange={(event) => handleInputChange(event, key)}
            style={styles.input}
            value={value}
            placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
          />
        ))}
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button style={styles.button} onClick={handleCreateResident}>
          Create Resident
        </button>
      </div>
    </div>
  );
};

const styles = {
  formContainer: {
    margin: "20px 0",
    padding: 20,
    border: "1px solid #ccc",
    borderRadius: 5,
  },
  input: {
    border: "1px solid #ddd",
    marginBottom: 10,
    padding: 8,
    fontSize: 18,
    width: "100%",
  },
  button: {
    backgroundColor: "black",
    color: "white",
    outline: "none",
    fontSize: 18,
    padding: "12px 20px",
    cursor: "pointer",
    width: "100%",
  },
};

export default ResidentForm;
