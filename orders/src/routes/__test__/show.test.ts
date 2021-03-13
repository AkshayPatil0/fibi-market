import request from 'supertest'
import { app } from '../../app'
import { Product } from '../../models/product';
import mongoose from 'mongoose';

it("returns 200 on success", async () => {
	
	const title = "product1";
	const price = "50"
	const vendor = new mongoose.Types.ObjectId().toHexString();
	
	const product = Product.build({title, price, vendor})
	await product.save()

	const productRes = await request(app)
	.get(`/api/products/${product.id}`)
	.send()
	.expect(200);
	
	expect(productRes.body.title).toEqual(title);
	
})

it("returns 404 on invalid id", async () => {
	
	const id = new mongoose.Types.ObjectId().toHexString();
	await request(app)
		.get(`/api/products/${id}`)
		.send()
		.expect(404);

})

