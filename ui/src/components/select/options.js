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

  let catopts = [];
  cats.forEach((cat) => {
    catopts = [
      ...catopts,
      { value: cat.id, label: cat.title },
      ...getCategoryOptions(cat.childrens),
    ];
  });
  return catopts;
};
