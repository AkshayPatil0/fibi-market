import { useSelector } from "react-redux";

export const isAdmin = (user) => user?.role === "admin";
export const isVendor = (user) => user?.role === "vendor";
export const isUser = (user) => user?.role === "user";

export const getName = (user) => user.firstName + " " + user.lastName;
export const getInitials = (user) =>
  user.firstName?.charAt(0) + user.lastName?.charAt(0);

export const getSavingPercentage = (mrp, retail) =>
  Math.ceil(((mrp - retail) / mrp) * 100);

export const getObjectById = (id, objects) =>
  objects.find((obj) => obj.id === id);

export const getCartTotal = (products) => {
  let totalCost = 0,
    totalDiscount = 0,
    totalPrice = 0;
  products.map(({ product, quantity, variantId }) => {
    if (variantId) {
      let variant = getObjectById(variantId, product.variants);
      totalCost += variant.price.mrp * quantity;
      totalPrice += variant.price.retail * quantity;
    } else {
      totalCost += product.price.mrp * quantity;
      totalPrice += product.price.retail * quantity;
    }
  });

  totalDiscount = totalCost - totalPrice;

  return { totalCost, totalPrice, totalDiscount };
};

export const getCurrentUserState = () =>
  useSelector((state) => state.auth.currentUser);

export const getCategoriesState = () =>
  useSelector((state) => state.product.categories);

export const getProductFilterState = () =>
  useSelector((state) => state.filter.product);

export const getOrderFilterState = () =>
  useSelector((state) => state.filter.order);

export const getUserFilterState = () =>
  useSelector((state) => state.filter.user);

export const getProductsState = () =>
  useSelector((state) => state.product.products);

export const getProductState = () =>
  useSelector((state) => state.product.product);

export const getCartState = () => useSelector((state) => state.order.cart);

export const getImageFormData = (image) => {
  if (!image) return null;
  var fData = new FormData();
  fData.set("image", image);
  return fData;
};

export const getImagesFormData = (images) => {
  if (!images || !images.length > 0) return null;
  var fData = new FormData();
  for (const key of Object.keys(images)) {
    fData.append("images", images[key]);
  }
  return fData;
};

export const getObjectUrls = (images) => {
  // console.log(images);
  if (!images || !images.length > 0) return [];
  var urls = [];
  for (const key of Object.keys(images)) {
    urls.push(URL.createObjectURL(images[key]));
  }
  return urls;
};
