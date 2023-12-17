// import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import {
  fetchResidents,
  addNewResident,
} from "../../context/residentServices/residentServices";
import ResidentForm from "../residentForm";

const RegistrationForm = () => {
  const initialState = {
    firstName: "",
    middleName: "",
    lastName: "",
    gender: "",
    age: "",
    address: "",
    role: "",
    profileImage: "",
  };

  const [formState, setFormState] = useState(initialState);
  const [residents, setResidents] = useState([]);

  useEffect(() => {
    fetchResidents(setResidents);
  }, []);

  async function handleAddResident() {
    try {
      await addNewResident(
        formState,
        setFormState,
        residents,
        setResidents,
        initialState
      );
    } catch (error) {
      console.error("Error adding resident:", error);
      // Handle errors...
    }
  }
  function handleCreateInputChange(event, key) {
    setFormState({ ...formState, [key]: event.target.value });
  }
  return (
    <div>
      <ResidentForm
        formState={formState}
        handleInputChange={handleCreateInputChange}
        addNewResident={handleAddResident}
      />
    </div>
  );
};

export default RegistrationForm;
