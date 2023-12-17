import { generateClient } from "aws-amplify/api";
import {
  createResident,
  deleteResident,
  updateResident,
} from "../../graphql/mutations";
import { listResidents } from "../../graphql/queries";

const client = generateClient();

export async function fetchResidents(setResidents) {
  try {
    const ResidentData = await client.graphql({
      query: listResidents,
    });
    const residents = ResidentData.data.listResidents.items;
    setResidents(residents);
  } catch (err) {
    console.log("Error fetching residents:", err);
    throw new Error("Error fetching residents");
  }
}

export async function addNewResident(
  formState,
  setFormState,
  residents,
  setResidents,
  initialState
) {
  try {
    // Example validation for form fields (replace this with your actual validation)
    const requiredFields = [
      "firstName",
      "middleName",
      "lastName",
      "gender",
      "age",
      "address",
      "role",
      "profileImage",
    ];
    const isValid = requiredFields.every((field) => formState[field]);

    if (!isValid) {
      throw new Error("Please fill in all required fields.");
    }

    const resident = { ...formState };

    // Example logic to add a resident (replace this with your actual implementation)
    const newResidentResponse = await client.graphql({
      query: createResident,
      variables: {
        input: resident,
      },
    });

    const { id } = newResidentResponse.data.createResident;

    // Update the state with the new resident
    setResidents([...residents, { ...resident, id }]);
    setFormState(initialState);
  } catch (err) {
    console.log("Error creating resident:", err);
    throw new Error(`Error creating resident: ${err.message}`);
  }
}

// ... (previous code remains the same)

export async function deleteResidentData(residents, setResidents, residentId) {
  try {
    // Example logic to delete a resident (replace this with your actual implementation)
    await client.graphql({
      query: deleteResident,
      variables: {
        input: { id: residentId },
      },
    });

    // Filter out the deleted resident from the list
    const updatedResidents = residents.filter(
      (resident) => resident.id !== residentId
    );

    // Update the state with the updated list of residents (excluding the deleted one)
    setResidents(updatedResidents);
  } catch (err) {
    console.log("Error deleting resident:", err);
    throw new Error(`Error deleting resident: ${err.message}`);
  }
}
// console.log(typeof setFormState);

export async function updateResidentInfo(
  residentId,
  formState,
  setFormState,
  setSelectedResident,
  initialState,
  residents,
  setResidents
) {
  try {
    const updatedResident = { ...formState };

    await client.graphql({
      query: updateResident,
      variables: {
        input: {
          id: residentId,
          firstName: updatedResident.firstName,
          middleName: updatedResident.middleName,
          lastName: updatedResident.lastName,
          gender: updatedResident.gender,
          age: updatedResident.age,
          address: updatedResident.address,
          role: updatedResident.role,
          profileImage: updatedResident.profileImage,
        },
      },
    });

    // Check if residents is an array before updating
    if (Array.isArray(residents)) {
      const updatedResidents = residents.map((resident) =>
        resident.id === residentId
          ? { ...resident, ...updatedResident }
          : resident
      );
      setResidents(updatedResidents);
    } else {
      console.error("Error updating resident: residents is not an array");
    }

    // Clear the form state and selected resident after updating
    setSelectedResident(null);
    setFormState(initialState);
  } catch (err) {
    console.error("Error updating resident:", err);
    throw new Error(`Error updating resident: ${err.message}`);
  }
}

export async function viewResidentDetails(
  resident,
  setSelectedResident,
  setModalOpen
) {
  try {
    // Example logic to view resident details (replace this with your actual implementation)
    setSelectedResident(resident);
    setModalOpen(true);
  } catch (err) {
    console.log("Error viewing resident details:", err);
    throw new Error(`Error viewing resident details: ${err.message}`);
  }
}

export function countResidents(residents) {
  try {
    if (Array.isArray(residents)) {
      return residents.length;
    } else {
      console.error("Error counting residents: residents is not an array");
      return 0; // or handle this case according to your logic
    }
  } catch (err) {
    console.error("Error counting residents:", err);
    throw new Error(`Error counting residents: ${err.message}`);
  }
}

// ... (previous code remains the same)

export function countMaleResidents(residents) {
  try {
    if (Array.isArray(residents)) {
      const maleResidents = residents.filter(
        (resident) => resident.gender.toLowerCase() === "male"
      );
      return maleResidents.length;
    } else {
      console.error("Error counting male residents: residents is not an array");
      return 0; // or handle this case according to your logic
    }
  } catch (err) {
    console.error("Error counting male residents:", err);
    throw new Error(`Error counting male residents: ${err.message}`);
  }
}

// ... (other functions remain the same)

// ... (previous code remains the same)

export function countFemaleResidents(residents) {
  try {
    if (Array.isArray(residents)) {
      const femaleResidents = residents.filter(
        (resident) => resident.gender.toLowerCase() === "female"
      );
      return femaleResidents.length;
    } else {
      console.error(
        "Error counting female residents: residents is not an array"
      );
      return 0; // or handle this case according to your logic
    }
  } catch (err) {
    console.error("Error counting female residents:", err);
    throw new Error(`Error counting female residents: ${err.message}`);
  }
}

// ... (other functions remain the same)

// ... (previous code remains the same)

export function countAllAddresses(residents) {
  try {
    if (Array.isArray(residents)) {
      const allAddresses = residents.map((resident) => resident.address);
      const addressCounts = {};

      // Count occurrences of each address
      allAddresses.forEach((address) => {
        if (addressCounts[address]) {
          addressCounts[address]++;
        } else {
          addressCounts[address] = 1;
        }
      });

      return Object.keys(addressCounts).length;
    } else {
      console.error("Error counting all addresses: residents is not an array");
      return 0; // or handle this case according to your logic
    }
  } catch (err) {
    console.error("Error counting all addresses:", err);
    throw new Error(`Error counting all addresses: ${err.message}`);
  }
}

// ... (other functions remain the same)
