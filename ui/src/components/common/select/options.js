export const orderStatusOptions = [
  { value: "cart", label: "Cart" },
  { value: "created", label: "Created" },
  { value: "completed", label: "Completed" },
  { value: "cancelled", label: "Cancelled" },
];

export const userRoleOptions = [
  { value: "user", label: "User" },
  { value: "vendor", label: "Vendor" },
  { value: "admin", label: "Admin" },
];

export const getCategoryOptions = (cats) => {
  if (!cats) return [];
  var pre = "- ";
  let catopts = [];
  cats.forEach((cat) => {
    const children = getCategoryOptions(cat.childrens);
    catopts = [
      ...catopts,
      { value: cat.id, label: cat.title },
      ...children.map((child) => ({
        value: child.value,
        label: pre + child.label,
      })),
    ];
  });
  return catopts;
};
