import { Publisher, VendorDeletedEvent, Subjects } from "@fibimarket/common";

class VendorDeletedPublisher extends Publisher<VendorDeletedEvent> {
  subject: Subjects.VendorDeleted = Subjects.VendorDeleted;
}

export { VendorDeletedPublisher };
