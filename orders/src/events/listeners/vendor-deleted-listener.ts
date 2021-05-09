import { Message } from "node-nats-streaming";
import { Listener, VendorDeletedEvent, Subjects } from "@fibimarket/common";
import { Vendor } from "../../models/vendor";

class VendorDeletedListener extends Listener<VendorDeletedEvent> {
  subject: Subjects.VendorDeleted = Subjects.VendorDeleted;
  queueGroupName = "service";

  async onMessage(data: VendorDeletedEvent["data"], msg: Message) {
    console.log(msg.getSequence(), data);

    try {
      const vendor = await Vendor.findById(data.id);

      if (!vendor) return;

      await vendor.delete();

      msg.ack();
    } catch (err) {
      console.error(err);
    }
  }
}

export { VendorDeletedListener };
