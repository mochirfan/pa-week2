import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTimer } from "../../utils/useTimer";
import InactiveModal from "./InactiveModal";

function Home() {
  const idleTime = 30;
  const { time, startTimer, stopTimer, resetTimer } = useTimer(idleTime);
  const navigate = useNavigate();
  const [showIdleModal, setShowIdleModal] = useState(false);

  const backToLoginHandler = () => {
    navigate("/login");
  };

  useEffect(() => {
    if (time === 0) {
      stopTimer();
      setShowIdleModal(true);
    }
  }, [time, stopTimer]);

  useEffect(() => {
    startTimer();

    const mouseEventListener = (e) => {
      resetTimer();
    };

    document.addEventListener("mousemove", mouseEventListener);

    return () => {
      document.removeEventListener("mousemove", mouseEventListener);
    };
  }, [startTimer, stopTimer]);

  return (
    <Container>
      <div className="vh-100 d-flex mt-5 justify-content-center">
        <Row>
          <Col>
            <Card>
              <Card.Header>Dashboard </Card.Header>
              <Card.Body style={{ padding: "32px" }}>
                <Card.Title>Selamat Datang,</Card.Title>
                <Card.Text>Selamat datang di aplikasi kami, anda dapat menggunakan fitur-fitur yang telah kami sediakan</Card.Text>
                <Alert className="mt-5" variant="warning">
                  <div className="d-flex justify-content-between">Anda akan auto logout jika tidak ada aktivitas (mouse move) <strong>{time}</strong></div>
                </Alert>
                <div className="text-end">
                  <Button variant="primary" className="mt-5" onClick={backToLoginHandler}>
                    Logout
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
      <InactiveModal show={showIdleModal} idleTime={idleTime} />
    </Container>
  );
}

export default Home;
