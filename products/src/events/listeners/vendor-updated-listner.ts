import { Message } from "node-nats-streaming";
import { Listener, VendorUpdatedEvent, Subjects } from "@fibimarket/common";
import { Vendor } from "../../models/vendor";

class VendorUpdatedListener extends Listener<VendorUpdatedEvent> {
  subject: Subjects.VendorUpdated = Subjects.VendorUpdated;
  queueGroupName = "service";

  async onMessage(data: VendorUpdatedEvent["data"], msg: Message) {
    console.log(msg.getSequence(), data);

    try {
      const vendor = await Vendor.findById(data.id);

      if (!vendor) return;

      vendor.set({
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

export { VendorUpdatedListener };
