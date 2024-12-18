import { DashboardIcon, LockClosedIcon, BackpackIcon, ExclamationTriangleIcon, RocketIcon } from "@radix-ui/react-icons";

export const SIDEBARITEM = [
  {
    label: "Dashboard",
    href: "/",
    icon: DashboardIcon,
    child: [],
  },
  {
    label: "Quản Lý Chương Học",
    href: "/chapter",
    icon: BackpackIcon,
    child: [],
  },
  {
    label: "Feedbacks",
    href: "/feedback",
    icon: RocketIcon,
    child: [],
  },
  {
    label: "Reports",
    href: "/report",
    icon: ExclamationTriangleIcon,
    child: [],
  },
  {
    label: "Phân Quyền",
    href: "/decentralization",
    icon: LockClosedIcon,
    child: [],
  },
];
