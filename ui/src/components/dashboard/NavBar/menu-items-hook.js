import { useEffect, useState } from "react";
import {
  AlertCircle,
  BarChart,
  Lock,
  Settings,
  ShoppingBag,
  User,
  Users,
  ShoppingCart,
} from "react-feather";
import { isAdmin, isVendor } from "../../../utils";

export const useMenuItems = (user) => {
  const [items, setItems] = useState([]);

  const adminMenuItems = [
    {
      href: "/dashboard/account",
      icon: User,
      title: "Account",
    },
    {
      href: "/dashboard/users",
      icon: Users,
      title: "Users",
    },
    {
      href: "/dashboard/products",
      icon: ShoppingBag,
      title: "Products",
    },
    {
      href: "/dashboard/orders",
      icon: ShoppingCart,
      title: "Orders",
    },
    {
      href: "/dashboard/settings",
      icon: Settings,
      title: "Settings",
    },
  ];

  const vendorMenuItems = [
    {
      href: "/dashboard/account",
      icon: User,
      title: "Account",
    },
    {
      href: "/dashboard/products",
      icon: ShoppingBag,
      title: "Products",
    },
    {
      href: "/dashboard/orders",
      icon: ShoppingCart,
      title: "Orders",
    },
    {
      href: "/dashboard/settings",
      icon: Settings,
      title: "Settings",
    },
  ];
  const userMenuItems = [
    // {
    //   href: "/dashboard",
    //   icon: BarChart,
    //   title: "Dashboard",
    // },
    {
      href: "/dashboard/account",
      icon: User,
      title: "Account",
    },
    {
      href: "/dashboard/cart",
      icon: ShoppingCart,
      title: "Cart",
    },
    {
      href: "/dashboard/orders",
      icon: ShoppingBag,
      title: "Orders",
    },
    {
      href: "/dashboard/settings",
      icon: Settings,
      title: "Settings",
    },
  ];

  useEffect(() => {
    if (isAdmin(user)) setItems(adminMenuItems);
    else if (isVendor(user)) setItems(vendorMenuItems);
    else setItems(userMenuItems);
  }, []);

  return items;
};
