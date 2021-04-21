import { nats } from "@fibimarket/common";
// import { BlogUpdatedPublisher } from "../events/publishers/blog-updated-publisher";
import { BlogAttrs, BlogDoc } from "../models/blog";

export function updateBlog(blog: BlogDoc, newBlog: BlogAttrs): Promise<void> {
  return new Promise<void>(async (resolve, reject) => {
    try {
      blog.set(newBlog);

      blog = await blog.save();

      // await new BlogUpdatedPublisher(nats.client).publish({
      //   id: blog.id,
      //   title: blog.title,
      //   description: blog.description,
      //   version: blog.version,
      // });

      resolve();
    } catch (err) {
      reject(err);
    }
  });
}
