import { PersonIcon, ExitIcon } from "@radix-ui/react-icons";

export const OPTIONS = [
  {
    label: "Cá Nhân",
    href: "/personal",
    icon: PersonIcon,
    type: "link"
  },
  {
    label: "Đăng Xuất",
    href: "/logOut",
    icon: ExitIcon,
    type: "button"
  },
];