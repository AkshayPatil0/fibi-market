import * as api from "../../api";
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
      throw err;
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
      throw err;
    }
  };
};

export const createBlog = (onSuccess) => {
  return async (dispatch, getState) => {
    try {
      const blog = getState().blog.blog;
      const res = await api.createBlog(blog);
      onSuccess(res.data);
    } catch (err) {
      throw err;
    }
  };
};

export const updateBlog = () => {
  return async (dispatch, getState) => {
    try {
      const blog = getState().blog.blog;
      const res = await api.updateBlog(blog.id, blog);
      dispatch(setBlog(res.data));
    } catch (err) {
      throw err;
    }
  };
};

export const deleteBlog = (id) => {
  return async (dispatch, getState) => {
    try {
      const blogs = getState().blog.blogs;
      await api.deleteBlog(id);
      dispatch(setBlogs(blogs.filter((blog) => blog.id !== id)));
    } catch (err) {
      throw err;
    }
  };
};
