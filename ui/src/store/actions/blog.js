import * as api from "../../api";
import { setSnackbar } from "./app";
export const SET_BLOGS = "set-blogs";
export const SET_BLOG = "set-blog";

export const setBlogs = (blogs) => {
  return {
    type: SET_BLOGS,
    payload: blogs,
  };
};

export const getBlogs = () => {
  return async (dispatch) => {
    try {
      const res = api.fetchBlogs();
      dispatch(setBlogs((await res).data));
    } catch (err) {
      dispatch(setSnackbar("Error fetching blogs, try again !", "error"));
      // throw err;
    }
  };
};

export const setBlog = (blog) => {
  return {
    type: SET_BLOG,
    payload: blog,
  };
};

export const getBlog = (slug) => {
  return async (dispatch) => {
    try {
      const res = await api.fetchBlog(slug);
      dispatch(setBlog(res.data));
    } catch (err) {
      dispatch(setSnackbar("Error fetching blog, try again !", "error"));
      // throw err;
    }
  };
};

export const createBlog = (onSuccess) => {
  return async (dispatch, getState) => {
    try {
      const blog = getState().blog.blog;
      const res = await api.createBlog(blog);
      dispatch(setSnackbar("Blog created !", "success"));
      onSuccess(res.data);
    } catch (err) {
      dispatch(setSnackbar("Error creating blog, try again !", "error"));
      // throw err;
    }
  };
};

export const updateBlog = () => {
  return async (dispatch, getState) => {
    try {
      const blog = getState().blog.blog;
      const res = await api.updateBlog(blog.id, blog);
      dispatch(setSnackbar("Blog updated !", "success"));
      dispatch(setBlog(res.data));
    } catch (err) {
      dispatch(setSnackbar("Error updating blog, try again !", "error"));
      // throw err;
    }
  };
};

export const deleteBlog = (id) => {
  return async (dispatch, getState) => {
    try {
      const blogs = getState().blog.blogs;
      await api.deleteBlog(id);
      dispatch(setSnackbar("Blog deleted !", "success"));
      dispatch(setBlogs(blogs.filter((blog) => blog.id !== id)));
    } catch (err) {
      dispatch(setSnackbar("Error deleting blog, try again !", "error"));
      // throw err;
    }
  };
};
