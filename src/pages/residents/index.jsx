/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Amplify } from "aws-amplify";
import {
  fetchResidents,
  // addNewResident,
  deleteResidentData,
  // updateResidentInfo,
  viewResidentDetails,
} from "../../context/residentServices/residentServices";
import amplifyconfig from "../../amplifyconfiguration.json";
import ResidentList from "../residentList";
import Modal from "../../views/modal/Modal";
Amplify.configure(amplifyconfig);

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

const Residents = () => {
  const [formState, setFormState] = useState(initialState);
  const [residents, setResidents] = useState([]);
  const [selectedResident, setSelectedResident] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editFormOpen, setEditFormOpen] = useState(false);
  useEffect(() => {
    fetchResidents(setResidents);
  }, []);

  async function handleDeleteResident(residentId) {
    try {
      await deleteResidentData(residents, setResidents, residentId);
    } catch (error) {
      console.error("Error deleting resident:", error);
      // Handle errors...
    }
  }

  // View Resident Details Part
  function handleViewResidentDetails(resident) {
    viewResidentDetails(resident, setSelectedResident, setModalOpen);
  }

  const updateResidents = (updatedResidentData) => {
    // Update the residents state with the updated resident data
    const updatedResidents = residents.map((resident) =>
      resident.id === updatedResidentData.id ? updatedResidentData : resident
    );
    setResidents(updatedResidents);
  };
  return (
    <div>
      <ResidentList
        residents={residents}
        // selectResident={selectResident}
        deleteResidentData={handleDeleteResident}
        viewResidentDetails={handleViewResidentDetails}
        editFormOpen={editFormOpen}
        setEditFormOpen={setEditFormOpen}
        setSelectedResident={setSelectedResident}
        initialState={initialState}
        styles={styles}
        formState={formState}
        setFormState={setFormState}
        updateResidents={updateResidents}
        setResidents={setResidents}
      />

      <Modal
        show={modalOpen}
        closeModal={() => {
          setModalOpen(false);
          setSelectedResident(null);
        }}
        resident={selectedResident}
      />
    </div>
  );
};

const styles = {
  container: {
    width: 400,
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: 20,
  },
  todo: {
    marginBottom: 15,
    cursor: "pointer",
    border: "1px solid #ccc",
    padding: 10,
    borderRadius: 5,
  },
  formContainer: {
    margin: "20px 0",
    padding: 20,
    border: "1px solid #ccc",
    borderRadius: 5,
  },
  todoName: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
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
  },
};

export default Residents;
