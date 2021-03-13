import { Publisher, VendorCreatedEvent, Subjects } from "@fibimarket/common";

class VendorCreatedPublisher extends Publisher<VendorCreatedEvent> {
  subject: Subjects.VendorCreated = Subjects.VendorCreated;
}

export { VendorCreatedPublisher };
