import { useState } from "react";

import { Button, Modal } from "react-bootstrap";

const TopicActionModal = ({ children, Form = null, title = "" }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <span onClick={handleShow}>{children}</span>

      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{<Form handleClose={handleClose} />}</Modal.Body>
      </Modal>
    </>
  );
};
export default TopicActionModal;
