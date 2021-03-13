import { ProductUpdatedEvent, Publisher, Subjects } from "@fibimarket/common";

class ProductUpdatedPublisher extends Publisher<ProductUpdatedEvent>{
	subject: Subjects.ProductUpdated = Subjects.ProductUpdated
}

export { ProductUpdatedPublisher }