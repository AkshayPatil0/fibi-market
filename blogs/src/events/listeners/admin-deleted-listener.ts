import { Message } from "node-nats-streaming";
import { Listener, AdminDeletedEvent, Subjects } from "@fibimarket/common";
import { Author } from "../../models/author";

class AdminDeletedListener extends Listener<AdminDeletedEvent> {
  subject: Subjects.AdminDeleted = Subjects.AdminDeleted;
  queueGroupName = "service";

  async onMessage(data: AdminDeletedEvent["data"], msg: Message) {
    console.log(msg.getSequence(), data);

    try {
      const author = await Author.findById(data.id);

      if (!author) return;

      await author.delete();

      msg.ack();
    } catch (err) {
      console.error(err);
    }
  }
}

export { AdminDeletedListener };
