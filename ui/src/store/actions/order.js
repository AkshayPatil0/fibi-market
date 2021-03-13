import * as api from '../../api';

export const SET_ORDERS = "set-orders";

const setOrders = (orders) => {
	return {
		type: SET_ORDERS,
		payload: orders
	}
}

export const getOrders = (query) => {
	return async dispatch => {
		const res = await api.fetchOrders(query)
		dispatch(setOrders(res.data))
	}
}

export const getMyOrders = () => {
	return async dispatch => {
		const res = await api.fetchMyOrders();
		dispatch(setOrders(res.data))
	}
}