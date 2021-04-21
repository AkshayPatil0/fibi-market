import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCart } from "../../../store/actions/order";

export function useCartHook() {
  const cart = useSelector((state) => state.product.cart);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCart());
  }, []);

  const addToCart = async (productId, quantity) => {
    try {
      const res = await axios.post("/api/orders/cart", { productId, quantity });
      setCart(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const removeFromCart = async (productId, quantity) => {
    try {
      const res = await axios.post("/api/orders/cart/remove", {
        productId,
        quantity,
      });
      setCart(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const placeOrder = async () => {
    try {
      await axios.post("/api/orders");
      await dispatch(getCart());
      // setOrders(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return {
    cart,
    addToCart,
    removeFromCart,
    placeOrder,
  };
}
