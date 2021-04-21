import { Publisher, AdminUpdatedEvent, Subjects } from "@fibimarket/common";

class AdminUpdatedPublisher extends Publisher<AdminUpdatedEvent> {
  subject: Subjects.AdminUpdated = Subjects.AdminUpdated;
}

export { AdminUpdatedPublisher };
