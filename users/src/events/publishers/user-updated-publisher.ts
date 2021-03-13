import { Publisher, UserUpdatedEvent, Subjects } from "@fibimarket/common";

class UserUpdatedPublisher extends Publisher<UserUpdatedEvent> {
  subject: Subjects.UserUpdated = Subjects.UserUpdated;
}

export { UserUpdatedPublisher };
