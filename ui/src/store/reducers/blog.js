import { SET_BLOG, SET_BLOGS } from "../actions/blog";

const initialBlog = {
  title: "",
  description: "",
  body: "",
  relevances: [],
};

const initialState = {
  blogs: [],
  blog: initialBlog,
};

export default function BlogReducer(state = initialState, action) {
  switch (action.type) {
    case SET_BLOGS:
      return {
        ...state,
        blogs: action.payload,
      };

    case SET_BLOG:
      return {
        ...state,
        blog: action.payload || initialBlog,
      };

    default:
      return state;
  }
}
