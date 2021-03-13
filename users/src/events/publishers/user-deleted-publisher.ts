import { Publisher, UserDeletedEvent, Subjects } from "@fibimarket/common";

class UserDeletedPublisher extends Publisher<UserDeletedEvent> {
  subject: Subjects.UserDeleted = Subjects.UserDeleted;
}

export { UserDeletedPublisher };
