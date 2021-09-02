import React, { useContext } from "react";
import { Modal } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { PostContext } from "../../contexts/PostContext";
import { useState } from "react";

const AddPostModal = () => {
  const { showAddPostModal, setShowAddPostModal, addPost, setShowToast } =
    useContext(PostContext);

  const [newPost, setNewPost] = useState({
    title: "",
    description: "",
    url: "",
    status: "TO LEARN",
  });

  const { title, description, url } = newPost;

  const onChangeNewPostForm = (event) =>
    setNewPost({ ...newPost, [event.target.name]: event.target.value });

  const closeDialog = () => {
    onResetPostModal();
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const { success, message } = await addPost(newPost);
    setShowToast({
      show: true,
      message: message,
      type: success === true ? "success" : "danger",
    });
    onResetPostModal();
  };

  const onResetPostModal = () => {
    setNewPost({ title: "", description: "", url: "", status: "TO LEARN" });
    setShowAddPostModal(false);
  };

  return (
    <Modal show={showAddPostModal} onHide={closeDialog}>
      <Modal.Header closeButton={true}>
        <Modal.Title>What do you want to learn?</Modal.Title>
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
              onChange={onChangeNewPostForm}
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
              onChange={onChangeNewPostForm}
            ></Form.Control>
          </Form.Group>

          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Url"
              name="url"
              value={url}
              onChange={onChangeNewPostForm}
            ></Form.Control>
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

export default AddPostModal;
