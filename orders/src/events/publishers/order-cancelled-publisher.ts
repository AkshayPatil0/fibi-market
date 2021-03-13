import { OrderCancelledEvent, Publisher, Subjects } from "@fibimarket/common";

class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}

export { OrderCancelledPublisher };
