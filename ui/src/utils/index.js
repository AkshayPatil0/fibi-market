export const isAdmin = (user) => user?.role === "admin";
export const isVendor = (user) => user?.role === "vendor";
export const isUser = (user) => user?.role === "user";

export const getDateTime = (createdAt) =>
  new Date(createdAt || Date.now()).toDateString();

export const getName = (user) => user.firstName + " " + user.lastName;

export const getInitials = (user) =>
  user.firstName?.charAt(0) + user.lastName?.charAt(0);

export const capitalise = (str) => str.charAt(0).toUpperCase() + str.slice(1);

export const getSavingPercentage = (mrp, retail) =>
  Math.ceil(((mrp - retail) / mrp) * 100);

export const getObjectById = (id, objects) =>
  objects.find((obj) => obj.id === id);

export const getCartTotal = (products) => {
  let totalCost = 0,
    totalDiscount = 0,
    totalPrice = 0;
  products.forEach(({ product, quantity, variantId }) => {
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

export const getImageFormData = (image, name) => {
  if (!image) return null;
  var fData = new FormData();
  fData.set(name || "image", image);
  return fData;
};

export const getImagesFormData = (images, name) => {
  if (!images || !images.length > 0) return null;
  var fData = new FormData();
  for (const key of Object.keys(images)) {
    fData.append(name || "images", images[key]);
  }
  return fData;
};

export const getObjectUrl = (image) => {
  // console.log(image);
  if (!image) return "";
  return URL.createObjectURL(image);
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
