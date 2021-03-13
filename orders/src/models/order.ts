import { OrderStatus } from '@fibimarket/common';
import mongoose from 'mongoose';
import { ProductDoc } from './product';

interface OrderAttrs {
	userId: string,
	status: OrderStatus,
	totalCost: number,
	products: { product: ProductDoc, quantity: number }[]
}

interface OrderModel extends mongoose.Model<OrderDoc> {
	build(attrs: OrderAttrs): OrderDoc
}

export interface OrderDoc extends mongoose.Document {
	userId: string,
	status: OrderStatus,
	totalCost: number,
	products: { product: ProductDoc, quantity: number }[]
}

const orderSchema = new mongoose.Schema(
	{
		userId: {
			type: String,
			required: true
		},
		status: {
			type: String,
			required: true
		},
		totalCost: {
			type: Number
		},
		products: [{
			product: {
				type: mongoose.Types.ObjectId,
				ref: 'products',
				required: true
			},
			quantity: { type: Number, default: 1 }
		}]
	},
	{
		toJSON: {
			transform(doc, ret) {
				ret.id = ret._id;
				delete ret._id;
			}
		}
	}
);

orderSchema.statics.build = (attrs: OrderAttrs) => {
	return new Order(attrs);
}

const Order = mongoose.model<OrderDoc, OrderModel>('orders', orderSchema);

export { Order }