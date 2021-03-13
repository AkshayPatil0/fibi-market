import request from 'supertest'
import { app } from '../../app'

it("returns 200 on successfull signin", async () => {
	await request(app)
		.post('/api/users/signup')
		.send({
			email: "test@test.com",
			password: "123456"
		})
		.expect(201);
	
		await request(app)
		.post('/api/users/signin')
		.send({
			email: "test@test.com",
			password: "123456"
		})
		.expect(200);
})

it("returns 400 on invalid email or password", async () => {

	await request(app)
		.post('/api/users/signin')
		.send({
			email: "",
			password: "123456"
		})
		.expect(400);

	await request(app)
		.post('/api/users/signin')
		.send({
			email: "testjom",
			password: ""
		})
		.expect(400);

	await request(app)
		.post('/api/users/signin')
		.send({
			email: "testjom",
			password: "123456"
		})
		.expect(400);

	await request(app)
		.post('/api/users/signin')
		.send({
			email: "test@test.com",
			password: "1234"
		})
		.expect(400);
})

it("set cookie after successfull signin", async () => {

	await request(app)
	.post('/api/users/signup')
	.send({
		email: "test@test.com",
		password: "123456"
	})
	.expect(201);
	
	const res = await request(app)
	.post('/api/users/signin')
	.send({
		email: "test@test.com",
		password: "123456"
	})
	.expect(200);

	expect(res.get('Set-Cookie')).toBeDefined();
})