import Alert from "react-bootstrap/Alert";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import { useState, useEffect } from "react";
import { useTimer } from "../../utils/useTimer";
import { useNavigate } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";

function Login(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [captcha, setCaptcha] = useState("");
  const [tryCount, setTryCount] = useState(0);
  const { time, startTimer, stopTimer } = useTimer(30);
  const navigate = useNavigate();
  const captchaKey = "6LcCAoUiAAAAAGgJVtuTr8CMKr7bfOR1a_t4UtQH";

  const usernameChangeHandler = (e) => {
    setUsername(e.target.value);
  };
  const passwordChangeHandler = (e) => {
    setPassword(e.target.value);
  };

  const resetForm = () => {
    setUsername("");
    setPassword("");
  };

  useEffect(() => {
    if (tryCount === 3) {
      startTimer();
    }
  }, [tryCount, startTimer]);

  useEffect(() => {
    if (time === 0) {
      stopTimer();
      setTryCount(0);
    }
  }, [time, stopTimer]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (username === "admin" && password === "admin") {
      resetForm();
      navigate("/home");
    } else {
      setTryCount((prev) => prev + 1);
    }
  };

  const onCaptchaChange = (value) => {
    setCaptcha(value);
  };

  return (
    <Container>
      <div className="vh-100 d-flex mt-5 justify-content-center">
        <Row>
          <Col>
            <Card>
              <Card.Header>Login Page</Card.Header>
              <Card.Body style={{ padding: "32px" }}>
                <form className="login-form" onSubmit={submitHandler} style={{ width: "500px" }}>
                  <div className="icon d-flex align-items-center justify-content-center">
                    <span className="fas fa-user"></span>
                  </div>
                  <div className="form-group mb-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label">
                      Username
                    </label>
                    <input type="text" value={username} onChange={usernameChangeHandler} className="form-control" placeholder="Username" required />
                  </div>
                  <div className="form-group mb-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label">
                      Password
                    </label>
                    <input type="password" value={password} onChange={passwordChangeHandler} className="form-control" placeholder="Password" required />
                  </div>
                  <div className="form-group mb-4">
                    <ReCAPTCHA sitekey={captchaKey} onChange={onCaptchaChange} />
                  </div>
                  {tryCount > 0 && tryCount < 3 ? <Alert variant="danger">Username atau password salah, anda memiliki kesempatan {tryCount}/3</Alert> : null}
                  {tryCount >= 3 ? <Alert variant="danger">Anda sudah gagal melakukan percobaan login sebanyak 3 kali, silahkan menunggu {time} detik lagi</Alert> : null}
                  <div className="form-group mb-3">
                    <button type="submit" className="btn btn-primary w-100 px-5" disabled={!captcha || tryCount >= 3}>
                      Masuk
                    </button>
                  </div>
                </form>
              </Card.Body>
            </Card>
            <Alert className="mt-3 text-center" variant="info">
              username: <strong>admin</strong> dan password: <strong>admin</strong>
            </Alert>
          </Col>
        </Row>
      </div>
    </Container>
  );
}

export default Login;
