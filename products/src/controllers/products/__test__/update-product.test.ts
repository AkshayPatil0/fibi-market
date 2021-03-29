import request from 'supertest'
import { app } from '../../../app'
import { Product } from '../../../models/product';
import mongoose from 'mongoose';

it("returns 200 on successful update", async () => {

	// const product = await global.createProduct()
	const cookie = await global.signin('vendor')
	const product = await request(app)
		.post('/api/products')
		.set("Cookie", cookie)
		.send({
			title: "eghg",
			price: 53,
			stock: 10
		})

	const title = "sdgbd";
	const price = "56"
	const productRes = await request(app)
		.put(`/api/products/${product.body.id}`)
		.set("Cookie", cookie)
		.send({
			title,
			price
		})
		.expect(200);

	expect(productRes.body.title).toEqual(title);
})

it("returns 404 on invalid product id", async () => {

	await request(app)
		.put(`/api/products/${mongoose.Types.ObjectId().toHexString()}`)
		.set("Cookie", await global.signin('vendor'))
		.send({
			title: "fogij",
			price: "54"
		})
		.expect(404);

})

it("returns 400 on invalid input", async () => {

	const cookie = await global.signin('vendor')
	const product = await request(app)
		.post('/api/products')
		.set("Cookie", cookie)
		.send({
			title: "eghg",
			price: 53,
			stock: 10
		})

	await request(app)
		.put(`/api/products/${product.body.id}`)
		.set("Cookie", await global.signin('vendor'))
		.send({
			title: "",
			price: "54"
		})
		.expect(400);

	await request(app)
		.put(`/api/products/${product.body.id}`)
		.set("Cookie", await global.signin('vendor'))
		.send({
			title: "fogfd",
			price: ""
		})
		.expect(400);

	await request(app)
		.put(`/api/products/${product.body.id}`)
		.set("Cookie", await global.signin('vendor'))
		.send({
			title: "eghbiodnf",
			price: "-23"
		})
		.expect(400);

})

it("returns 401 on if user not authorized", async () => {

	const product = await global.createProduct()

	const productRes = await request(app)
		.put(`/api/products/${product.id}`)
		.send({
			title: "fogij",
			price: "54"
		})
		.expect(401);

})

it("returns 401 on if vendor does not own the product", async () => {

	const product = await global.createProduct()

	const productRes = await request(app)
		.put(`/api/products/${product.id}`)
		.set("Cookie", await global.signin('vendor'))
		.send({
			title: "fogij",
			price: "54"
		})
		.expect(401);

})