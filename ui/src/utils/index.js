import { useSelector } from "react-redux";

export const isAdmin = (user) => user?.role === "admin";
export const isVendor = (user) => user?.role === "vendor";
export const isUser = (user) => user?.role === "user";

export const getName = (user) => user.firstName + " " + user.lastName;
export const getInitials = (user) =>
  user.firstName?.charAt(0) + user.lastName?.charAt(0);

export const getCurrentUserState = () =>
  useSelector((state) => state.auth.currentUser);

export const getCategoriesState = () =>
  useSelector((state) => state.product.categories);

export const getProductFilterState = () =>
  useSelector((state) => state.filter.product);
