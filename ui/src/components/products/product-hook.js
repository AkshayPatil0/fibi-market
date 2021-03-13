import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation, useParams } from "react-router";
import * as api from "../../api";
import {
  getProduct,
  getProducts,
  setProduct,
} from "../../store/actions/product";

export function useProductsHook() {
  const location = useLocation();
  const user = useSelector((state) => state.auth.currentUser);
  const router = useHistory();

  const [isLoading, setIsLoading] = useState(false);

  // const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const run = async () => {
      setIsLoading(true);
      try {
        await dispatch(getProducts({ vendor: user.role === "vendor" ? user.id : undefined }));
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    run();
  }, [location, dispatch]);

  return {
    isLoading,
  };
}

export function useNewProductHook() {
  const location = useLocation();
  const router = useHistory();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.currentUser);
  const product = useSelector((state) => state.product.product);
  const [previews, setPreviews] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    price: "",
    stock: "",
    category: "",
    images: [],
  });

  const { id } = useParams();

  useEffect(() => {
    return () => {
      dispatch(setProduct(null));
    };
  }, []);

  useEffect(() => {
    if (!user) {
      router.push("/auth/signin");
    }
    const run = async () => {
      try {
        dispatch(getProduct(id));
      } catch (err) {
        console.error(err);
      }
    };
    if (id) {
      run();
    }
  }, [location]);

  useEffect(() => {
    if (product) {
      setFormData({
        title: product.title,
        price: product.price,
        stock: product.stock,
        category: product.category,
        images: [],
      });
      setPreviews(product.images || []);
    }
  }, [product]);

  useEffect(() => {
    var urls = [];
    for (const key of Object.keys(formData.images)) {
      urls.push(URL.createObjectURL(formData.images[key]));
    }
    if (urls.length > 0) {
      setPreviews(urls);
    }
  }, [formData.images]);

  const handleChange = (e) => {
    if (e.target.name === "images") {
      setFormData({ ...formData, images: e.target.files });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const newProduct = async () => {
    let id;
    try {
      const res = await api.createProduct(formData);
      id = res.data.id;
    } catch (err) {
      console.log(err);
    }

    if (formData.images.length > 0 && id) {
      var fData = new FormData();
      for (const key of Object.keys(formData.images)) {
        fData.append("images", formData.images[key]);
      }

      try {
        await api.updateProductImages(id, fData);
      } catch (err) {
        console.error(err);
      }
    }
  };

  const updateProduct = async () => {
    try {
      await api.updateProduct(id, formData);
    } catch (err) {
      console.log(err);
    }

    if (formData.images.length > 0 && id) {
      var fData = new FormData();
      for (const key of Object.keys(formData.images)) {
        fData.append("images", formData.images[key]);
      }

      try {
        await api.updateProductImages(id, fData);
      } catch (err) {
        console.error(err);
      }
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (id) {
      await updateProduct();
      return;
    }
    await newProduct();
  };

  return {
    newProduct,
    updateProduct,
    previews,
    handleChange,
    formData,
    onSubmit,
  };
}

export function useProductHook() {
  const addToCart = async (productId, quantity) => {
    try {
      const res = await api.addToCart({ productId, quantity });
    } catch (err) {
      console.log(err);
    }
  };

  const deleteProduct = async (id) => {
    try {
      await api.deleteProduct(id);
    } catch (err) {
      console.error(err);
    }
  };

  return {
    addToCart,
    deleteProduct,
  };
}
