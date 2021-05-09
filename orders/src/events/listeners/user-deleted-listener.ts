import { Message } from "node-nats-streaming";
import { Listener, UserDeletedEvent, Subjects } from "@fibimarket/common";
import { User } from "../../models/user";

class UserDeletedListener extends Listener<UserDeletedEvent> {
  subject: Subjects.UserDeleted = Subjects.UserDeleted;
  queueGroupName = "service";

  async onMessage(data: UserDeletedEvent["data"], msg: Message) {
    console.log(msg.getSequence(), data);

    try {
      const user = await User.findById(data.id);

      if (!user) return;

      await user.delete();

      msg.ack();
    } catch (err) {
      console.error(err);
    }
  }
}

export { UserDeletedListener };
