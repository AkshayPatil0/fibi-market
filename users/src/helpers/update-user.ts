import { nats, UserRoles } from "@fibimarket/common";
import { AdminUpdatedPublisher } from "../events/publishers/admin-updated-publisher";
import { UserUpdatedPublisher } from "../events/publishers/user-updated-publisher";
import { VendorUpdatedPublisher } from "../events/publishers/vendor-updated-publisher";
import { UserAttrs, UserDoc } from "../models/user";

export const updateUser = (
  userDoc: UserDoc,
  userAttrs: UserAttrs
): Promise<void> => {
  return new Promise(async (resolve, reject) => {
    try {
      userDoc.set(userAttrs);
      await userDoc.save();

      if (userDoc.role === UserRoles.user) {
        new UserUpdatedPublisher(nats.client).publish({
          id: userDoc.id,
          email: userDoc.email,
          firstName: userDoc.firstName,
          lastName: userDoc.lastName,
          avatar: userDoc.avatar,
          version: userDoc.version,
        });
      } else if (userDoc.role === UserRoles.vendor) {
        new VendorUpdatedPublisher(nats.client).publish({
          id: userDoc.id,
          email: userDoc.email,
          firstName: userDoc.firstName,
          lastName: userDoc.lastName,
          avatar: userDoc.avatar,
          version: userDoc.version,
        });
      } else if (userDoc.role === UserRoles.admin) {
        new AdminUpdatedPublisher(nats.client).publish({
          id: userDoc.id,
          email: userDoc.email,
          firstName: userDoc.firstName,
          lastName: userDoc.lastName,
          avatar: userDoc.avatar,
          version: userDoc.version,
        });
      }

      resolve();
    } catch (err) {
      reject(err);
    }
  });
};
