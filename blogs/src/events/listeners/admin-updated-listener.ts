import { Message } from "node-nats-streaming";
import { Listener, AdminUpdatedEvent, Subjects } from "@fibimarket/common";
import { Author } from "../../models/author";

class AdminUpdatedListener extends Listener<AdminUpdatedEvent> {
  subject: Subjects.AdminUpdated = Subjects.AdminUpdated;
  queueGroupName = "service";

  async onMessage(data: AdminUpdatedEvent["data"], msg: Message) {
    console.log(msg.getSequence(), data);

    try {
      const author = await Author.findById(data.id);

      if (!author) return;

      author.set({
        firstName: data.firstName,
        lastName: data.lastName,
        avatar: data.avatar,
        email: data.email,
      });

      await author.save();

      msg.ack();
    } catch (err) {
      console.error(err);
    }
  }
}

export { AdminUpdatedListener };
