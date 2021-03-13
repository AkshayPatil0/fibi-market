import { Publisher, UserCreatedEvent, Subjects } from "@fibimarket/common";

class UserCreatedPublisher extends Publisher<UserCreatedEvent> {
  subject: Subjects.UserCreated = Subjects.UserCreated;
}

export { UserCreatedPublisher };
