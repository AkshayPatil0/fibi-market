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
      ...JSON.parse(JSON.stringify(par)),
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
