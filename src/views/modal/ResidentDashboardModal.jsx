/* eslint-disable react/prop-types */
import { Modal, Button } from "react-bootstrap";
import { BsCheckCircle, BsExclamationCircle } from "react-icons/bs";

const ResidentDashboardModal = ({ show, handleClose, message, isAdmin }) => {
  const IconComponent = isAdmin ? BsCheckCircle : BsExclamationCircle;
  let iconColorClass = isAdmin ? "text-success" : "text-danger";

  return (
    <Modal
      show={show}
      onHide={handleClose}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      animation={true}
    >
      <Modal.Header style={styles.modalContent}>
        <Modal.Title
          style={styles.modalContent}
          className="d-flex justify-content-center text-center mx-auto"
        >
          <IconComponent size={80} className={iconColorClass} />
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={styles.modalContent} className="text-center">
        {message}
      </Modal.Body>
      <Modal.Footer
        className="d-flex justify-content-center"
        style={styles.modalContent}
      >
        <Button
          className="border-0"
          style={styles.modalHeader}
          variant="secondary"
          onClick={handleClose}
        >
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
const styles = {
  modalHeader: {
    backgroundColor: "#D7872D",
  },
  modalContent: {
    backgroundColor: "#FDF0D5",
  },
  // Other styles as needed
};
export default ResidentDashboardModal;
