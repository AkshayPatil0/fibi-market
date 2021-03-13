import { ProductDeletedEvent, Publisher, Subjects } from "@fibimarket/common";

class ProductDeletedPublisher extends Publisher<ProductDeletedEvent>{
	subject: Subjects.ProductDeleted = Subjects.ProductDeleted
}

export { ProductDeletedPublisher }