import { OrderCreatedEvent, Publisher, Subjects } from "@fibimarket/common";

class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
}

export { OrderCreatedPublisher };
