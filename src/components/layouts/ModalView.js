import { Modal, Button } from "react-bootstrap";

function ModalView(props) {
  return (
    <>
      <Modal show={true} onHide={props.onClose}>
        <Modal.Header className="mt-0">
          <Modal.Title>Profile of the Person</Modal.Title>
          <button type="button" className=" btn" onClick={props.onClose}>
            <span aria-hidden="true" className="fs-1 mt-0">
              &times;
            </span>
          </button>
        </Modal.Header>
        <Modal.Body>
          <div id="profile-div">
            <p>
              <strong>First Name: </strong> {props.data.givenName}
            </p>
            <p>
              <strong>Last Name: </strong> {props.data.surname}
            </p>
            <p>
              <strong>Email: </strong> {props.data.userPrincipalName}
            </p>
            <p>
              <strong>Id: </strong> {props.data.id}
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.onClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalView;
