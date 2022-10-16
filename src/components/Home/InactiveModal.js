import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";

function InactiveModal(props) {
  const navigate = useNavigate();

  const backToLoginHandler = () => {
    navigate("/login");
  };

  return (
    <Modal show={props.show} onHide={props.onHide} size="lg">
      <Modal.Header>
        <Modal.Title>Inactive</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="py-5">Anda tidak melakukan kegiatan apapun dalam waktu {props.idleTime} detik.</div>
        <div className="modal-footer">
          <button className="btn btn-primary" type="button" onClick={backToLoginHandler}>
            Stop
          </button>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default InactiveModal;
