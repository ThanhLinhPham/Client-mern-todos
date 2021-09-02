import { createContext, useReducer, useState } from "react";
import axios from "axios";
import { postReducer } from "../reducers/postReducer";
import {
  ADD_POST,
  apiUrl,
  DELETE_POST,
  EDIT_POST,
  FIND_POST,
  POSTS_LOADED_FAIL,
  POSTS_LOADED_SUCCESS,
  UPDATE_POST,
} from "./constants";

export const PostContext = createContext();

const PostContextProvider = ({ children }) => {
  // State
  const [postState, dispatch] = useReducer(postReducer, {
    post: null,
    posts: [],
    postsLoading: true,
  });

  const [showAddPostModal, setShowAddPostModal] = useState(false);
  const [showUpdatePostModal, setShowUpdatePostModal] = useState(false);
  const [showToast, setShowToast] = useState({
    show: false,
    message: "",
    type: null,
  });

  // Add post
  const addPost = async (newPost) => {
    try {
      const response = await axios.post(`${apiUrl}/post`, newPost);
      if (response.data.success) {
        dispatch({ type: ADD_POST, payload: response.data.post });
        return response.data;
      }
    } catch (error) {
      return error.response.data
        ? error.response.data
        : { success: false, message: "Server error." };
    }
  };

  // Add post
  const deletePost = async (postId) => {
    try {
      const response = await axios.delete(`${apiUrl}/post/${postId}`);
      if (response.data.success) {
        dispatch({ type: DELETE_POST, payload: postId });
      }
    } catch (error) {
      return error.response.data
        ? error.response.data
        : { success: false, message: "Server error." };
    }
  };

  // Find post
  const findPost = (postId) => {
    const _post = postState.posts.find((post) => post._id === postId);
    dispatch({ type: FIND_POST, payload: _post });
  };

  // Update post
  const updatePost = async (updatedPost) => {
    try {
      const response = await axios.put(
        `${apiUrl}/post/${updatedPost._id}`,
        updatedPost
      );
      if (response.data.success) {
        dispatch({ type: UPDATE_POST, payload: response.data.post });
        return response.data;
      }
    } catch (error) {
      return error.response.data
        ? error.response.data
        : { success: false, message: "Server error." };
    }
  };

  // Get all posts
  const getPosts = async () => {
    try {
      const response = await axios.get(`${apiUrl}/post`);
      if (response.data.success) {
        dispatch({
          type: POSTS_LOADED_SUCCESS,
          payload: response.data.posts,
        });
      }
    } catch (error) {
      dispatch({
        type: POSTS_LOADED_FAIL,
        payload: [],
      });
      // return error.response.data
      //   ? error.response.data
      //   : { success: false, message: "Error!" };
    }
  };

  // Post context data
  const postContextData = {
    getPosts,
    postState,
    showAddPostModal,
    setShowAddPostModal,
    addPost,
    showToast,
    setShowToast,
    deletePost,
    updatePost,
    findPost,
    showUpdatePostModal,
    setShowUpdatePostModal,
  };

  return (
    <PostContext.Provider value={postContextData}>
      {children}
    </PostContext.Provider>
  );
};

export default PostContextProvider;
