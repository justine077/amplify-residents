/* eslint-disable react/prop-types */
import { BsTrash, BsEye, BsPencil } from "react-icons/bs";
import { GrCaretPrevious, GrCaretNext } from "react-icons/gr";
import { useState } from "react";

import {
  Card,
  Col,
  Container,
  Pagination,
  Row,
  Table,
  Modal,
  Form,
  Button,
} from "react-bootstrap";
import { updateResidentInfo } from "../../context/residentServices/residentServices";

const ResidentList = ({
  residents,
  deleteResidentData,
  viewResidentDetails,
  setSelectedResident,
  setFormState,
  initialState,
  selectedResident,
  setResidents,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Logic to calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = residents.slice(indexOfFirstItem, indexOfLastItem);
  // const totalResidents = getTotalResidents(residents);

  // Change page
  const paginate = (pageNumber) => {
    if (
      pageNumber < 1 ||
      pageNumber > Math.ceil(residents.length / itemsPerPage)
    ) {
      return;
    }
    setCurrentPage(pageNumber);
  };

  const [showEditModal, setShowEditModal] = useState(false);
  const [editedResident, setEditedResident] = useState(null);

  // Function to open modal for editing resident
  const openEditModal = (resident) => {
    setEditedResident(resident);
    setShowEditModal(true);
  };

  // Function to close modal
  const closeEditModal = () => {
    setShowEditModal(false);
    setEditedResident(null);
  };

  // Function to handle editing resident data
  const handleEditResident = async () => {
    try {
      if (!editedResident) {
        throw new Error("No resident data to update");
      }

      // Perform the update using the updateResidentInfo function
      await updateResidentInfo(
        editedResident.id,
        editedResident,
        setFormState,
        setSelectedResident,
        initialState,
        residents,
        setResidents
      );

      // Close the modal after editing
      closeEditModal();
    } catch (err) {
      console.error("Error updating resident:", err);
      // Handle errors or display a message to the user
    }
  };

  return (
    <div>
      <Container fluid>
        <Row>
          <Col md="12">
            <Card>
              <Card.Body className="table-responsive">
                <Table className="table-hover">
                  <thead>
                    <tr className="bg-dark pb-3">
                      <th className="pb-3 pt-3 text-white">First Name</th>
                      <th className="pb-3 pt-3 text-white">Middle Name</th>
                      <th className="pb-3 pt-3 text-white">Last Name</th>
                      <th className="pb-3 pt-3 text-white">Gender</th>
                      <th className="pb-3 pt-3 text-white">Age</th>
                      <th className="pb-3 pt-3 text-white">Address</th>
                      <th className="pb-3 pt-3 text-white">Role</th>
                      <th className="pb-3 pt-3 text-white">Profile</th>
                      <th className="pb-3 pt-3 text-white">View</th>
                      <th className="pb-3 pt-3 text-white">Edit</th>
                      <th className="pb-3 pt-3 text-white">Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentItems.map((resident) => (
                      <tr key={resident.id} className={resident.className}>
                        <td>{resident.firstName || "N/A"}</td>
                        <td>{resident.middleName}</td>
                        <td>{resident.lastName}</td>
                        <td>{resident.gender}</td>
                        <td>{resident.age}</td>
                        <td>{resident.address}</td>
                        <td>{resident.role}</td>
                        <td>{resident.profileImage}</td>
                        <td>
                          <button
                            className="bg-transparent border-0"
                            onClick={(event) => {
                              event.stopPropagation();
                              viewResidentDetails(resident);
                            }}
                          >
                            <BsEye
                              size={20}
                              className="cursor-pointer text-warning"
                            />
                          </button>
                        </td>
                        <td>
                          <button
                            className="border-0 bg-transparent"
                            onClick={(event) => {
                              event.stopPropagation();
                              openEditModal(resident);
                            }}
                          >
                            <BsPencil
                              size={20}
                              className="cursor-pointer text-success"
                            />
                          </button>
                        </td>
                        <td>
                          <button
                            className="border-0 bg-transparent"
                            onClick={(event) => {
                              event.stopPropagation();
                              deleteResidentData(resident.id);
                              if (
                                selectedResident &&
                                selectedResident.id === resident.id
                              ) {
                                setSelectedResident(null);
                                setFormState(initialState);
                              }
                            }}
                          >
                            <BsTrash
                              size={20}
                              className="text-danger cursor-pointer"
                            />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
                {/* Pagination */}
                <Pagination className="d-flex mx-auto justify-content-between bg-dark px-3 cursor-pointer">
                  <div className="d-flex align-items-center my-auto justify-cenotent-center py-2 cursor-pointer">
                    <GrCaretPrevious
                      size={30}
                      className="text-white cursor-pointer"
                      onClick={() => paginate(currentPage - 1)}
                      disabled={currentPage === 1}
                    />
                    <span className="text-white cursor-pointer">Previous</span>
                  </div>
                  <div className="d-flex align-items-center my-auto justify-cenotent-center">
                    <GrCaretNext
                      size={30}
                      className="text-white cursor-pointer"
                      onClick={() => paginate(currentPage + 1)}
                      disabled={
                        currentPage ===
                        Math.ceil(residents.length / itemsPerPage)
                      }
                    />
                    <span className="text-white pl-1 ">Next</span>
                  </div>
                </Pagination>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <Modal show={showEditModal} onHide={closeEditModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Resident Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {editedResident && (
            <Form>
              <Form.Group controlId="firstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  value={editedResident.firstName}
                  onChange={(e) =>
                    setEditedResident({
                      ...editedResident,
                      firstName: e.target.value,
                    })
                  }
                />
              </Form.Group>
              <Form.Group controlId="middleName">
                <Form.Label>Middle Name</Form.Label>
                <Form.Control
                  type="text"
                  value={editedResident.middleName}
                  onChange={(e) =>
                    setEditedResident({
                      ...editedResident,
                      middleName: e.target.value,
                    })
                  }
                />
              </Form.Group>
              <Form.Group controlId="lastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  value={editedResident.lastName}
                  onChange={(e) =>
                    setEditedResident({
                      ...editedResident,
                      lastName: e.target.value,
                    })
                  }
                />
              </Form.Group>
              <Form.Group controlId="gender">
                <Form.Label>Gender</Form.Label>
                <Form.Control
                  type="text"
                  value={editedResident.gender}
                  onChange={(e) =>
                    setEditedResident({
                      ...editedResident,
                      gender: e.target.value,
                    })
                  }
                />
              </Form.Group>
              <Form.Group controlId="address">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  type="text"
                  value={editedResident.address}
                  onChange={(e) =>
                    setEditedResident({
                      ...editedResident,
                      address: e.target.value,
                    })
                  }
                />
              </Form.Group>
              <Form.Group controlId="role">
                <Form.Label>Role</Form.Label>
                <Form.Control
                  type="text"
                  value={editedResident.role}
                  onChange={(e) =>
                    setEditedResident({
                      ...editedResident,
                      role: e.target.value,
                    })
                  }
                />
              </Form.Group>
              <Form.Group controlId="profileImage">
                <Form.Label>Profile</Form.Label>
                <Form.Control
                  type="text"
                  value={editedResident.profileImage}
                  onChange={(e) =>
                    setEditedResident({
                      ...editedResident,
                      profileImage: e.target.value,
                    })
                  }
                />
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleEditResident}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ResidentList;
