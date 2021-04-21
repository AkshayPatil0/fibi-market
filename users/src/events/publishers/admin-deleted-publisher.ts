import { Publisher, AdminDeletedEvent, Subjects } from "@fibimarket/common";

class AdminDeletedPublisher extends Publisher<AdminDeletedEvent> {
  subject: Subjects.AdminDeleted = Subjects.AdminDeleted;
}

export { AdminDeletedPublisher };
