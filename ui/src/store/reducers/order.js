import { SET_ORDERS } from "../actions/order"

const initialState = {
	orders: []
}

export default function OrderReducer(state = initialState, action) {
	switch (action.type) {

		case SET_ORDERS:
			return {
				...state,
				orders: action.payload
			}

		default:
			return state
	}
}