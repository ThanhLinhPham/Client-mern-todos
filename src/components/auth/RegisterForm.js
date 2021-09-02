import { Button, Form } from "react-bootstrap";
import React, { useContext } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContexts";
import AlertMessage from "../layout/AlertMessage";

const RegisterForm = () => {
  // Context
  const { registerUser } = useContext(AuthContext);

  const [registerForm, setRegisterForm] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [alert, setAlert] = useState(null);

  const { username, password, confirmPassword } = registerForm;

  const register = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setAlert({ type: "danger", message: "Confirm password do not match!" });
      return;
    }
    try {
      const registerData = await registerUser(registerForm);
      if (!registerData.success) {
        setAlert({ type: "danger", message: registerData.message });
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  const onChangeRegisterForm = (event) => {
    if (
      alert?.message === "Confirm password do not match!" &&
      (event.target.name === "confirmPassword" ||
        event.target.name === "password")
    ) {
      setAlert(null);
    }
    setRegisterForm({
      ...registerForm,
      [event.target.name]: event.target.value,
    });
  };
  return (
    <>
      <Form className="my-4" onSubmit={register}>
        <AlertMessage info={alert} />
        <Form.Group>
          <Form.Control
            type="text"
            placeholder="Username"
            name="username"
            required
            onChange={onChangeRegisterForm}
            value={username}
          ></Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            required
            onChange={onChangeRegisterForm}
            value={password}
          ></Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Control
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            required
            onChange={onChangeRegisterForm}
            value={confirmPassword}
          ></Form.Control>
        </Form.Group>
        <Button variant="success" type="submit">
          Register
        </Button>
      </Form>
      <p>
        Already have an account?{" "}
        <Link to="/login">
          <Button variant="info" size="small" className="ml-2">
            Login
          </Button>
        </Link>{" "}
      </p>
    </>
  );
};

export default RegisterForm;
