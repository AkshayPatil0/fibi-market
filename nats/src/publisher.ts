import nats from 'node-nats-streaming';
import { ProductCreatedEvent, Publisher, Subjects } from '@fibimarket/common';

const stan = nats.connect("fibimarket", "abc", {
	url: "http://localhost:4222"
});

stan.on("connect", () => {
	console.log("publisher connected");

	const publisher = new ProductCreatedPublisher(stan);

	publisher.publish({
		id: "122",
		title: "product",
		price: "20",
		vendor: "qowd"
	})
	// const data = {
	// 	msg: "hiii"
	// }
	// stan.publish("product:created", JSON.stringify(data));
})


class ProductCreatedPublisher extends Publisher<ProductCreatedEvent>{
	subject: Subjects.ProductCreated = Subjects.ProductCreated
}