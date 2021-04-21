import * as api from "../../../api";

const getUsers = async (i) => {
  const res = await api.fetchUsers({ role: "user", email: i.toLowerCase() });
  return res.data.map((v) => ({ value: v.id, label: v.email }));
};

export const loadUsers = (input) => {
  return new Promise(async (resolve, reject) => {
    resolve(await getUsers(input));
  });
};

const getVendors = async (i) => {
  const res = await api.fetchUsers({
    role: "vendor",
    email: i.toLowerCase(),
  });
  return res.data.map((v) => ({ value: v.id, label: v.email }));
};

export const loadVendors = (input) => {
  return new Promise(async (resolve, reject) => {
    const vendorOptions = await getVendors(input);
    resolve(vendorOptions);
  });
};

const getProducts = async (i) => {
  const res = await api.fetchProducts({
    search: i.toLowerCase(),
  });
  return res.data.map((v) => ({ value: v.id, label: v.title }));
};

export const loadProducts = (input) => {
  return new Promise(async (resolve, reject) => {
    const productOptions = await getProducts(input);
    resolve(productOptions);
  });
};

const getBlogs = async (i) => {
  const res = await api.fetchBlogs({
    search: i.toLowerCase(),
  });
  return res.data.map((v) => ({ value: v.slug, label: v.title }));
};

export const loadBlogs = (input) => {
  return new Promise(async (resolve, reject) => {
    const blogOptions = await getBlogs(input);
    resolve(blogOptions);
  });
};
