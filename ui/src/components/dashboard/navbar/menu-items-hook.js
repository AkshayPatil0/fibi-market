import { LocationOn } from "@material-ui/icons";
import { useEffect, useState } from "react";
import {
  Settings,
  ShoppingBag,
  User,
  Users,
  ShoppingCart,
  Grid,
  Trello,
} from "react-feather";
import { isAdmin, isVendor } from "../../../utils";

export const useMenuItems = (user) => {
  const [items, setItems] = useState([]);
  useEffect(() => {
    const adminMenuItems = [
      {
        href: "/dashboard/account",
        icon: User,
        title: "Account",
      },
      {
        href: "/dashboard/blogs",
        icon: Trello,
        title: "Blogs",
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
        href: "/dashboard/categories",
        icon: Grid,
        title: "Categories",
      },
      {
        href: "/dashboard/locations",
        icon: LocationOn,
        title: "Locations",
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

    if (isAdmin(user)) setItems(adminMenuItems);
    else if (isVendor(user)) setItems(vendorMenuItems);
    else setItems(userMenuItems);
  }, [user]);

  return items;
};
