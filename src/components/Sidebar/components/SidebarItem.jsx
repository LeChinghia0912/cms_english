"use client";

import { twMerge } from "tailwind-merge";
import { usePathname } from "next/navigation";

import { Link } from "@/components";

const SidebarItem = ({ href, label, icon: Icon }) => {
  const pathname = usePathname();

  return (
    <li className="text-black">
      <Link
        href={href}
        className={twMerge(
          "p-4 hover:bg-[rgba(0,0,0,.15)] focus:text-white focus:bg-primary rounded-none",
          pathname === href && "bg-primary hover:bg-primary text-white"
        )}
      >
        <Icon className="w-5 h-5" />
        <span className="text-lg">{label}</span>
      </Link>
    </li>
  );
};

export default SidebarItem;
