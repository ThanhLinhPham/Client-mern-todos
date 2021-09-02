import { Button, Col, Row } from "react-bootstrap";

const About = () => {
  return (
    <Row className="mt-5">
      <Col className="text-center">
        <Button variant="primary" size="lg">
          <a
            href="http://google.com"
            target="_blank"
            style={{ color: "white", textDecoration: "none" }}
          >
            Go to Link
          </a>
        </Button>
      </Col>
    </Row>
  );
};
export default About;
