import { Message } from "node-nats-streaming";
import { Listener, VendorCreatedEvent, Subjects } from "@fibimarket/common";
import { Vendor } from "../../models/vendor";

class VendorCreatedListener extends Listener<VendorCreatedEvent> {
  subject: Subjects.VendorCreated = Subjects.VendorCreated;
  queueGroupName = "service";

  async onMessage(data: VendorCreatedEvent["data"], msg: Message) {
    console.log(msg.getSequence(), data);

    try {
      const vendor = Vendor.build({
        _id: data.id,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
      });

      await vendor.save();

      msg.ack();
    } catch (err) {
      console.error(err);
    }
  }
}

export { VendorCreatedListener };
