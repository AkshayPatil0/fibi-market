import { Message } from "node-nats-streaming";
import { Listener, UserCreatedEvent, Subjects } from "@fibimarket/common";
import { User } from "../../models/user";

class UserCreatedListener extends Listener<UserCreatedEvent> {
  subject: Subjects.UserCreated = Subjects.UserCreated;
  queueGroupName = "service";

  async onMessage(data: UserCreatedEvent["data"], msg: Message) {
    console.log(msg.getSequence(), data);

    try {
      const user = User.build({
        _id: data.id,
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

export { UserCreatedListener };
