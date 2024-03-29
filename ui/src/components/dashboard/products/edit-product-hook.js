import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation, useParams } from "react-router";
import * as api from "../../../api";
import {
  getProduct,
  newProduct,
  setProduct,
  setProductImages,
  updateProduct,
} from "../../../store/actions/product";
import { getImagesFormData, isAdmin } from "../../../utils";

export function useEditProductHook() {
  const location = useLocation();
  const router = useHistory();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.currentUser);
  const product = useSelector((state) => state.product.product);

  const { id } = useParams();

  const rootRef = useRef(null);

  useEffect(() => {
    if (isAdmin(user)) {
      const inputs = rootRef.current.querySelectorAll(".MuiInputBase-input");
      console.log(inputs);
      for (let input of inputs) {
        input.setAttribute("disabled", true);
        input.setAttribute("style", "color: grey");
      }
    }
  });

  useEffect(() => {
    return () => {
      dispatch(setProduct(null));
    };
  }, [dispatch]);

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
  }, [location, router, dispatch, id, user]);

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
    rootRef,
  };
}
