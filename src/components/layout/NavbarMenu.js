import { Navbar } from "react-bootstrap";
import { Nav } from "react-bootstrap";
import learnITLogo from "../../assets/logo.svg";
import logOutIcon from "../../assets/logout.svg";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContexts";
import { useContext } from "react";

const NavbarMenu = () => {
  const {
    authState: {
      user: { username },
    },
    logoutUser: logout,
  } = useContext(AuthContext);

  return (
    <Navbar expand="lg" bg="primary" variant="dark" className="shadow">
      <Navbar.Brand className="font-weight-bolder text-white">
        <img
          src={learnITLogo}
          alt="learnITLogo"
          width="32px"
          height="32px"
          className="mr-2"
          style={{ margin: "2px" }}
        />
        LearnIT
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse
        id="basic-navbar-nav"
        style={{ justifyContent: "space-between" }}
      >
        <Nav className="mr-auto">
          <Nav.Link
            className="font-weight-bolder text-white"
            to="/dashboard"
            as={Link}
          >
            Dashboard
          </Nav.Link>
          <Nav.Link
            className="font-weight-bolder text-white"
            to="/about"
            as={Link}
          >
            About
          </Nav.Link>
        </Nav>
        <Nav>
          <Nav.Link className="font-weight-bolder text-white" disabled>
            Welcome {username}
          </Nav.Link>
          <Button
            variant="secondary"
            className="font-weight-bolder text-white"
            onClick={logout}
          >
            <img
              src={logOutIcon}
              alt="logOutIcon"
              width="32px"
              height="32px"
              className="mr-2"
              style={{ margin: "2px" }}
            />
            Log Out
          </Button>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavbarMenu;
