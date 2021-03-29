import request from 'supertest'
import { app } from '../../../app'
import { Product } from '../../../models/product';

it("returns 201 on successfull creation of product", async () => {

	let products = await Product.find()
	expect(products.length).toEqual(0);

	const title = "product1";
	const price = 50
	await request(app)
		.post('/api/products')
		.set("Cookie", await global.signin('vendor'))
		.send({
			title,
			price
		})
		.expect(201);

	products = await Product.find()
	expect(products.length).toEqual(1);
	expect(products[0].title).toEqual(title)
	expect(products[0].price).toEqual(price)
})

it("returns 400 on invalid input", async () => {

	await request(app)
		.post('/api/products')
		.set("Cookie", await global.signin('vendor'))
		.send({
			title: "",
			price: 50
		})
		.expect(400);

	await request(app)
		.post('/api/products')
		.set("Cookie", await global.signin('vendor'))
		.send({
			title: "product1",
			price: ""
		})
		.expect(400);

	await request(app)
		.post('/api/products')
		.set("Cookie", await global.signin('vendor'))
		.send({
			title: "product1",
			price: "sdfj"
		})
		.expect(400);

	await request(app)
		.post('/api/products')
		.set("Cookie", await global.signin('vendor'))
		.send({
			title: "product1",
			price: -20
		})
		.expect(400);

})

it("returns 401 on unauthorized request", async () => {

	await request(app)
		.post('/api/products')
		.send({
			title: "product1",
			price: 50
		})
		.expect(401);

})


