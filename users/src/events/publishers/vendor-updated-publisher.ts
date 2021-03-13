import { Publisher, VendorUpdatedEvent, Subjects } from "@fibimarket/common";

class VendorUpdatedPublisher extends Publisher<VendorUpdatedEvent> {
  subject: Subjects.VendorUpdated = Subjects.VendorUpdated;
}

export { VendorUpdatedPublisher };
