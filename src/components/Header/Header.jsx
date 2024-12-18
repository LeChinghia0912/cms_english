"use client";

import { get } from "lodash";
import { useMemo } from "react";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation"; 
import { HamburgerMenuIcon } from "@radix-ui/react-icons";

import { Image } from "@/components";
import { Notification, Option, OPTIONS } from "@/components/Header";

const Header = () => {
  const { data } = useSession();
  const pathname = usePathname();
  const admin = get(data, ["admin"]);
  
  const renderOptions = useMemo(() => {
    return OPTIONS.map((el, idx) => (
      <Option key={idx} href={el.href} icon={el.icon} label={el.label} type={el.type} />
    ));
  }, []);

  if(pathname === "/login" || !data) return null;
  
  return (
    <header className="h-24 border-b-[1px] border-stone-400 px-5 mb-5">
      <div className="h-full flex-between">
        <label htmlFor="sidebar" className="cursor-pointer hover:opacity-80 transition-base">
          <HamburgerMenuIcon className="w-8 h-8" />
        </label>

        {/* actions */}
        <div className="flex items-center gap-4">
          <input type="checkbox" className="toggle" />

          <Notification />

          <div className="z-0 dropdown dropdown-end">
            <Image
              tabIndex={0}
              alt="avatar"
              src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              width={40}
              height={40}
              className="flex-shrink-0 object-cover rounded-full cursor-pointer hover:opacity-80 transition-base"
              />

            <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
              <li className="pb-2 mb-2 border-b-[1px] border-b-stone-300">
                <div className="flex gap-3 !cursor-default hover:bg-transparent">
                  <div className="flex-shrink-0">
                    <Image
                      width={42}
                      height={42}
                      alt="avatar"
                      className="object-cover rounded-full"
                      src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                    />
                  </div>
                  
                  <div className="flex flex-col">
                    <span className="font-bold">XIN CHÀO</span>
                    <span className="break-words">{admin?.fullName}</span>
                  </div>
                </div>
              </li>
              
              {renderOptions}
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
