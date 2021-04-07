import { OrderUpdatedEvent, Publisher, Subjects } from "@fibimarket/common";

class OrderUpdatedPublisher extends Publisher<OrderUpdatedEvent> {
  subject: Subjects.OrderUpdated = Subjects.OrderUpdated;
}

export { OrderUpdatedPublisher };
