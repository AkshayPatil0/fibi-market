import { Message } from "node-nats-streaming";
import { Listener, UserUpdatedEvent, Subjects } from "@fibimarket/common";
import { User } from "../../models/user";

class UserUpdatedListener extends Listener<UserUpdatedEvent> {
  subject: Subjects.UserUpdated = Subjects.UserUpdated;
  queueGroupName = "service";

  async onMessage(data: UserUpdatedEvent["data"], msg: Message) {
    console.log(msg.getSequence(), data);

    try {
      const user = await User.findById(data.id);

      if (!user) return;

      user.set({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
      });

      await user.save();

      msg.ack();
    } catch (err) {
      console.error(err);
    }
  }
}

export { UserUpdatedListener };
