import React, { useContext } from "react";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContexts";
import AlertMessage from "../layout/AlertMessage";

const LoginForm = () => {
  // Context
  const { loginUser } = useContext(AuthContext);

  const [loginForm, setLoginForm] = useState({
    username: "",
    password: "",
  });

  const [alert, setAlert] = useState(null);

  const { username, password } = loginForm;

  const login = async (event) => {
    event.preventDefault();
    try {
      const loginData = await loginUser(loginForm);
      if (loginData.success) {
        // history.push("/dashboard");
      } else {
        setAlert({ type: "danger", message: loginData.message });
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const onChangeLoginForm = (event) => {
    setLoginForm({ ...loginForm, [event.target.name]: event.target.value });
  };
  return (
    <>
      <Form className="my-4" onSubmit={login}>
        <AlertMessage info={alert} />
        <Form.Group>
          <Form.Control
            type="text"
            placeholder="Username"
            name="username"
            required
            value={username}
            onChange={onChangeLoginForm}
          ></Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            required
            value={password}
            onChange={onChangeLoginForm}
          ></Form.Control>
        </Form.Group>
        <Button variant="success" type="submit">
          Login
        </Button>
      </Form>
      <p>
        Don't have an account?{" "}
        <Link to="/register">
          <Button variant="info" size="small" className="ml-2">
            Register
          </Button>
        </Link>{" "}
      </p>
    </>
  );
};

export default LoginForm;
