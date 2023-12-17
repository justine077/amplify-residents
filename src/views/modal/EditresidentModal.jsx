// /* eslint-disable react/prop-types */
// import Button from "react-bootstrap/Button";
// import Modal from "react-bootstrap/Modal";
// import Form from "react-bootstrap/Form";
// import Col from "react-bootstrap/Col";
// import { updateResidentInfo } from "../../context/residentServices/residentServices";
// import { useState } from "react";

// const EditModalPage = ({ show, closeModal, resident, props, initialState }) => {
//   // Add a state to manage editing mode and track changes
//   const [isEditing, setIsEditing] = useState(false);
//   const [editedResident, setEditedResident] = useState({ ...resident });

//   // Create a function to toggle editing mode
//   const toggleEditing = () => {
//     setIsEditing(!isEditing);
//   };

//   // Create a function to handle changes in the form fields
//   const handleFieldChange = (fieldName, value) => {
//     setEditedResident({
//       ...editedResident,
//       [fieldName]: value,
//     });
//   };

//   return (
//     <Modal
//       {...props}
//       size="lg"
//       aria-labelledby="contained-modal-title-vcenter"
//       centered
//       show={show}
//       onHide={closeModal}
//       animation={false}
//     >
//       <Modal.Header
//         className="d-flex justify-content-center align-items-center pb-4 pt-3"
//         style={styles.modalHeader}
//       >
//         <div>
//           <Modal.Title>
//             <h2>Edit Resident Details</h2>
//           </Modal.Title>
//         </div>
//       </Modal.Header>
//       <Modal.Body
//         style={styles.modalContent}
//         className="d-flex justify-content-center"
//       >
//         <Form>
//           <Form.Row className="d-flex justify-content-center">
//             <Col className="px-1 d-flex" md="">
//               <Form.Group className="mr-4">
//                 <Form.Label>First Name</Form.Label>
//                 <Form.Control
//                   disabled={!isEditing} // Set disabled attribute based on isEditing state
//                   type="text"
//                   name="firstName"
//                   value={editedResident.firstName} // Use 'value' from editedResident
//                   onChange={(e) =>
//                     handleFieldChange("firstName", e.target.value)
//                   } // Handle field changes
//                   placeholder="First Name"
//                 />
//               </Form.Group>
//               <Form.Group className="mr-4">
//                 <Form.Label>Middle Name</Form.Label>
//                  <Form.Control
//                   disabled={!isEditing} // Set disabled attribute based on isEditing state
//                   type="text"
//                   name="firstName"
//                   value={editedResident.firstName} // Use 'value' from editedResident
//                   onChange={(e) =>
//                     handleFieldChange("firstName", e.target.value)
//                   } // Handle field changes
//                   placeholder="First Name"
//                 />
//               </Form.Group>
//               <Form.Group>
//                 <Form.Label>Last Name</Form.Label>
//                 <Form.Control
//                   readOnly
//                   type="text"
//                   name="lastName"
//                   defaultValue={resident.lastName}
//                   placeholder="Last Name"
//                 />
//               </Form.Group>
//             </Col>
//           </Form.Row>
//           <Form.Row className="d-flex justify-content-center">
//             <Col className="px-1 d-flex" md="">
//               <Form.Group className="mr-4">
//                 <Form.Label>Gender</Form.Label>
//                 <Form.Control
//                   readOnly
//                   type="text"
//                   name="gender"
//                   defaultValue={resident.gender}
//                   placeholder="Gender"
//                 />
//               </Form.Group>
//               <Form.Group className="mr-4">
//                 <Form.Label>Age</Form.Label>
//                 <Form.Control
//                   readOnly
//                   type="text"
//                   name="age"
//                   defaultValue={resident.age}
//                   placeholder="Age"
//                 />
//               </Form.Group>
//               <Form.Group>
//                 <Form.Label>Address</Form.Label>
//                 <Form.Control
//                   readOnly
//                   type="text"
//                   name="address"
//                   defaultValue={resident.address}
//                   placeholder="Address"
//                 />
//               </Form.Group>
//             </Col>
//           </Form.Row>
//           <Form.Row className="d-flex justify-content-center">
//             <Col className="px-1 d-flex" md="">
//               <Form.Group className="mr-4">
//                 <Form.Label>Role</Form.Label>
//                 <Form.Control
//                   readOnly
//                   type="text"
//                   name="role"
//                   defaultValue={resident.role}
//                   placeholder="Role"
//                 />
//               </Form.Group>
//               <Form.Group className="mr-4">
//                 <Form.Label>Age</Form.Label>
//                 <Form.Control
//                   readOnly
//                   type="text"
//                   name="profileImage"
//                   defaultValue={resident.profileImage}
//                   placeholder="Profile"
//                 />
//               </Form.Group>
//             </Col>
//           </Form.Row>
//         </Form>
//       </Modal.Body>
//       <Modal.Footer
//         style={styles.modalContent}
//         className="d-flex justify-content-center align-items-center py-4"
//       >
//         <Button
//           variant="primary"
//           onClick={() => {
//             if (isEditing) {
//               // Perform logic to update the resident with the edited details
//               updateResidentInfo(
//                 resident.id,
//                 editedResident,
//                 setEditedResident,
//                 setIsEditing,
//                 initialState
//               );
//             } else {
//               toggleEditing(); // Toggle editing mode when the button is clicked
//             }
//           }}
//         >
//           {isEditing ? "Save" : "Edit"}
//         </Button>
//       </Modal.Footer>
//     </Modal>
//   );
// };

// const styles = {
//   modalHeader: {
//     backgroundColor: "#D7872D",
//   },
//   modalContent: {
//     backgroundColor: "#FDF0D5",
//   },
//   // Other styles as needed
// };

// export default EditModalPage;
