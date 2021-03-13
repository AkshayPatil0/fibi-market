import mongoose from 'mongoose';
import {updateIfCurrentPlugin} from 'mongoose-update-if-current'

interface ProductAttrs{
	_id: string
	title: string,
	price: number,
	vendor: string,
	stock: number
}

interface ProductModel extends mongoose.Model<ProductDoc>{
	build(attrs: ProductAttrs): ProductDoc
}

export interface ProductDoc extends mongoose.Document{
	title: string,
	price: number,
	vendor: string,
	stock: number,
	version: number
}

const productSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true
		},
		price: {
			type: Number,
			required: true
		},
		vendor: {
			type: String,
			required: true
		},
		stock: {
			type: Number,
			default: 0
		}
	},
	{
		toJSON: {
			transform(doc, ret){
				ret.id = ret._id;
				delete ret._id;
			}
		}
	}
);

productSchema.set('versionKey', 'version');
productSchema.plugin(updateIfCurrentPlugin);

productSchema.statics.build = (attrs: ProductAttrs) => {
	return new Product(attrs);
}

const Product = mongoose.model<ProductDoc, ProductModel>('products', productSchema);

export {Product}