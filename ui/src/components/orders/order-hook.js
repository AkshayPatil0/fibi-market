import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as api from "../../api";
import { getMyOrders, getOrders } from "../../store/actions/order";

export function useOrderHook() {

  const orders = useSelector(state => state.order.orders)
  const user = useSelector(state => state.auth.currentUser)

  const dispatch = useDispatch()

  useEffect(() => {
    const run = async () => {
      try {
        if (user.role === 'user') {
          await dispatch(getMyOrders())
        }

        await dispatch(getOrders({}))

      } catch (err) {
        console.error(err);
      }
    }
    run();
  }, []);

  // const getOrders = async () => {
  //   try {
  //     const res = await api.fetchOrders();
  //     setOrders(res.data);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  const cancelOrder = async (id) => {
    try {
      await api.cancelOrder(id);
      getOrders();
    } catch (err) {
      console.log(err);
    }
  };

  return {
    orders,
    cancelOrder,
  };
}
