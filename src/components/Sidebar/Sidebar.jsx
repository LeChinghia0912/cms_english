"use client";

import { useMemo } from "react";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

import { Drawer } from "@/components";
import { SIDEBARITEM, SidebarItem } from "@/components/Sidebar";

const Sidebar = () => {
  const pathname = usePathname();
  const { data } = useSession();

  const renderSidebarItem = useMemo(() => {
    return SIDEBARITEM.map((el, idx) => (
      <SidebarItem key={idx} label={el.label} href={el.href} icon={el.icon} />
    ));
  }, []);

  if(pathname === "/login" || !data) return null;

  return (
    <Drawer labelOpen="sidebar" heading="LOGO">
      {renderSidebarItem}
    </Drawer>
  );
};

export default Sidebar;
