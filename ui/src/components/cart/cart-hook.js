import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCart } from "../../store/actions/product";

export function useCartHook() {
  // const [cart, setCart] = useState({});

  const cart = useSelector(state => state.product.cart);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCart());
  }, []);

  // const getCart = async () => {
  //   try {
  //     const res = await axios.get("/api/orders/cart");
  //     setCart(res.data);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

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
