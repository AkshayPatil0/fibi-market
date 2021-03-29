import { nats } from "@fibimarket/common";
import { ProductUpdatedPublisher } from "../events/publishers/product-updated-publisher";
import { ProductAttrs, ProductDoc } from "../models/product";

export function getChildrenIds(
  values: any[],
  parent: string | null | undefined = undefined
): Array<string> {
  let ids: string[] = [];

  if (!parent) {
    return [];
  }
  let childs = values.filter((cat) => cat.parent == parent);

  childs.forEach((child) => {
    ids = [...ids, child.id, ...getChildrenIds(values, child.id)];
  });

  return ids;
}

export function getChildrenTree(
  values: any[],
  parent: string | null | undefined = undefined
) {
  const tree: any[] = [];

  let parents = values.filter((val) => val.parent == parent);

  parents.forEach((par) => {
    tree.push({
      id: par.id,
      title: par.title,
      slug: par.slug,
      childrens: getChildrenTree(values, par.id),
    });
  });

  return tree;
}

export async function deleteChildren(
  values: any[],
  parent: string | null | undefined = undefined
) {
  let children = values.filter((val) => val.parent == parent);

  await Promise.all(
    children.map(async (child) => {
      await deleteChildren(values, child.id);
      await child.delete();
    })
  );
}

export function updateProduct(
  product: ProductDoc,
  newProduct: ProductAttrs
): Promise<void> {
  return new Promise<void>(async (resolve, reject) => {
    try {
      product.set(newProduct);

      product = await product.save();

      await new ProductUpdatedPublisher(nats.client).publish({
        id: product.id,
        title: product.title,
        description: product.description,
        sku: product.sku,
        vendor: product.vendor,
        price: product.price,
        specs: product.specs,
        stock: product.stock,
        category: product.category,
        location: product.location,
        images: product.images,
        hasVariants: product.hasVariants,
        variations: product.variations,
        variants: product.variants,
        version: product.version,
      });

      resolve();
    } catch (err) {
      reject(err);
    }
  });
}
