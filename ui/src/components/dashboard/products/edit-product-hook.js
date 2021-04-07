import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useLocation, useParams } from "react-router";
import * as api from "../../../api";
import {
  getProduct,
  newProduct,
  setProduct,
  setProductImages,
  updateProduct,
} from "../../../store/actions/product";
import {
  getCurrentUserState,
  getImagesFormData,
  getProductState,
} from "../../../utils";

export function useEditProductHook() {
  const location = useLocation();
  const router = useHistory();
  const dispatch = useDispatch();

  const user = getCurrentUserState();
  const product = getProductState();

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
        // dispatch(get)
      } catch (err) {
        console.error(err);
      }
    };
    if (id) {
      run();
    }
  }, [location]);

  const addProductImage = async (e) => {
    const res = await api.addProductImage(
      id,
      getImagesFormData(e.target.files)
    );
    dispatch(setProduct({ ...product, images: res.data.images }));
  };

  const removeProductImage = async (uri) => {
    const res = await api.removeProductImage(id, { uri });
    dispatch(setProduct({ ...product, images: res.data.images }));
  };

  const handleChange = (e) => {
    if (e.target.name === "images") {
      dispatch(setProductImages(e.target.files));
    } else {
      dispatch(setProduct({ ...product, [e.target.name]: e.target.value }));
    }
  };

  return {
    newProduct,
    updateProduct,
    handleChange,
    product,
    addProductImage,
    removeProductImage,
  };
}
