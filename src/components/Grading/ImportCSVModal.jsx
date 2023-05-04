import { Suspense, lazy, useState } from "react";
import { Modal, Spinner } from "react-bootstrap";

import useGradeSelector from "../../hooks/Selectors/useGradeSelector";

const ImportCSVForm = lazy(() => import("./ImportCSVForm"));

const ImportCSVModal = ({ children }) => {
  const [show, setShow] = useState(false);

  const { gradeLock } = useGradeSelector();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <button
        className="secondary-outlined-btn"
        onClick={handleShow}
        disabled={gradeLock === "LOCKED"}
      >
        Import CSV
      </button>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Import CSV File</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Suspense
            fallback={
              <Spinner
                style={{
                  width: "30px",
                  height: "30px",
                  display: "block",
                  margin: "0px auto",
                }}
              />
            }
          >
            <ImportCSVForm />
          </Suspense>
        </Modal.Body>
      </Modal>
    </>
  );
};
export default ImportCSVModal;
