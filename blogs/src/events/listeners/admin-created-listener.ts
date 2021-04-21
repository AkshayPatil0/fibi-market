import { Message } from "node-nats-streaming";
import { Listener, AdminCreatedEvent, Subjects } from "@fibimarket/common";
import { Author } from "../../models/author";

class AdminCreatedListener extends Listener<AdminCreatedEvent> {
  subject: Subjects.AdminCreated = Subjects.AdminCreated;
  queueGroupName = "service";

  async onMessage(data: AdminCreatedEvent["data"], msg: Message) {
    console.log(msg.getSequence(), data);

    try {
      const author = Author.build({
        _id: data.id,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        avatar: data.avatar,
      });

      await author.save();

      msg.ack();
    } catch (err) {
      console.error(err);
    }
  }
}

export { AdminCreatedListener };
