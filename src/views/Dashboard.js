import { Button, OverlayTrigger, Toast, Tooltip } from "react-bootstrap";
import { useContext, useEffect } from "react";
import { Col, Row, Spinner } from "react-bootstrap";
import { Card } from "react-bootstrap";
import SinglePost from "../components/post/SinglePost";
import { AuthContext } from "../contexts/AuthContexts";
import { PostContext } from "../contexts/PostContext";
import AddPostModal from "../components/post/AddPostModal";
import addIcon from "../assets/plus-circle-fill.svg";
import UpdatePostModal from "../components/post/UpdatePostModal";

const Dashboard = () => {
  const {
    authState: {
      user: { username },
    },
  } = useContext(AuthContext);

  const {
    postState: { posts, postsLoading, post },
    getPosts,
    setShowAddPostModal,
    showToast: { show, message, type },
    setShowToast,
    showUpdatePostModal,
  } = useContext(PostContext);

  let body = null;

  if (postsLoading) {
    body = (
      <div className="spinner-container">
        <Spinner animation="border" variant="info" />
      </div>
    );
  } else if (posts.length === 0) {
    body = (
      <>
        <Card className="text-center mx-5 my-5">
          <Card.Header as="h1">Hi {username}</Card.Header>
          <Card.Body>
            <Card.Title>welcome to LearnIT</Card.Title>
            <Card.Text>
              Click the button below to track your first skill to learn
            </Card.Text>
            <Button
              variant="primary"
              onClick={setShowAddPostModal.bind(this, true)}
            >
              Learn IT!
            </Button>
          </Card.Body>
        </Card>
      </>
    );
  } else {
    body = (
      <>
        <Row className="row-cols-1 row-cols-md-3 g-4 mx-auto mt-3">
          {posts.map((post) => (
            <Col key={post._id} className="my02">
              <SinglePost post={post} />
            </Col>
          ))}
        </Row>
        {/* <OverlayTrigger
          placement="left"
          overlay={<Tooltip>Add a class to learn </Tooltip>}
        > */}
        <Button
          className="btn-floating"
          onClick={setShowAddPostModal.bind(this, true)}
        >
          <img src={addIcon} alt="add" width="60px" height="60px" />
        </Button>
        {/* </OverlayTrigger> */}
      </>
    );
  }

  useEffect(() => getPosts(), []);
  return (
    <>
      {body}
      <AddPostModal />
      {post !== null && <UpdatePostModal />}

      <Toast
        show={show}
        style={{ position: "fixed", top: "5%", right: "10px" }}
        className={`bg-${type} text-white`}
        onClose={setShowToast.bind(this, {
          show: false,
          message: "",
          type: null,
        })}
        delay={3000}
        autohide={true}
      >
        <Toast.Body>
          <strong>{message}</strong>
        </Toast.Body>
      </Toast>
    </>
  );
};
export default Dashboard;
