import React, { useContext, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { PostContext } from "../../contexts/PostContext";
import { useState } from "react";

const UpdatePostModal = () => {
  const {
    postState: { post },
    setShowUpdatePostModal,
    showUpdatePostModal,
    updatePost,
    setShowToast,
  } = useContext(PostContext);

  const [updatedPost, setUpdatedPost] = useState(post);

  const { title, description, url, status } = updatedPost;

  const onChangeUpdatedPostForm = (event) =>
    setUpdatedPost({ ...updatedPost, [event.target.name]: event.target.value });

  const closeDialog = () => {
    setUpdatedPost(post);
    setShowUpdatePostModal(false);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const { success, message } = await updatePost(updatedPost);
    setShowToast({
      show: true,
      message: message,
      type: success === true ? "success" : "danger",
    });
    setShowUpdatePostModal(false);
  };

  useEffect(() => setUpdatedPost(post), [post]);

  //   const onResetPostModal = () => {
  //     setUpdatedPost({ title: "", description: "", url: "", status: "TO LEARN" });
  //     setShowUpdatePostModal(false);
  //   };

  return (
    <Modal show={showUpdatePostModal} onHide={closeDialog}>
      <Modal.Header closeButton={true}>
        <Modal.Title>Change?</Modal.Title>
      </Modal.Header>
      <Form onSubmit={onSubmit}>
        <Modal.Body>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Title"
              name="title"
              required
              aria-describedby="title-help"
              value={title}
              onChange={onChangeUpdatedPostForm}
            ></Form.Control>
            <Form.Text id="title-help" muted>
              Required
            </Form.Text>
          </Form.Group>

          <Form.Group>
            <Form.Control
              as="textarea"
              placeholder="Description"
              name="description"
              rows={3}
              value={description}
              onChange={onChangeUpdatedPostForm}
            ></Form.Control>
          </Form.Group>

          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Url"
              name="url"
              value={url}
              onChange={onChangeUpdatedPostForm}
            ></Form.Control>
          </Form.Group>

          <Form.Group>
            <Form.Control
              as="select"
              value={status}
              name="status"
              onChange={onChangeUpdatedPostForm}
            >
              <option value="TO LEARN">TO LEARN</option>
              <option value="LEARNED">LEARNED</option>
              <option value="LEARNING">LEARNING</option>
            </Form.Control>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeDialog}>
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            Learn IT!
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default UpdatePostModal;
