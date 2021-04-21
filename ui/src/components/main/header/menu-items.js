import { Settings, ShoppingBag, User, ShoppingCart } from "react-feather";

export const menuItems = [
  {
    href: "/profile",
    icon: User,
    title: "Account",
  },
  {
    href: "/cart",
    icon: ShoppingCart,
    title: "Cart",
  },
  {
    href: "/orders",
    icon: ShoppingBag,
    title: "Orders",
  },
  {
    href: "/settings",
    icon: Settings,
    title: "Settings",
  },
];
