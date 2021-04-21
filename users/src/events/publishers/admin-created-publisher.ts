import { Publisher, AdminCreatedEvent, Subjects } from "@fibimarket/common";

class AdminCreatedPublisher extends Publisher<AdminCreatedEvent> {
  subject: Subjects.AdminCreated = Subjects.AdminCreated;
}

export { AdminCreatedPublisher };
