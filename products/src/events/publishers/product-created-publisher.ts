import { Publisher, ProductCreatedEvent, Subjects } from "@fibimarket/common";

class ProductCreatedPublisher extends Publisher<ProductCreatedEvent> {
  subject: Subjects.ProductCreated = Subjects.ProductCreated;
}

export { ProductCreatedPublisher };
