import nats, { Message } from 'node-nats-streaming';
import { ProductCreatedEvent, Subjects, Listener } from '@fibimarket/common';

const stan = nats.connect("fibimarket", "123", {
	url: "http://localhost:4222"
});

stan.on("connect", () => {
	console.log("listener connected");

	new ProductCreatedListener(stan).listen();
})

class ProductCreatedListener extends Listener<ProductCreatedEvent>{
	subject: Subjects.ProductCreated = Subjects.ProductCreated;
	queueGroupName = "service";

	onMessage(data: ProductCreatedEvent["data"], msg: Message){
		console.log(msg.getSequence(), data);

		msg.ack()
	}
}