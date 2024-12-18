import { memo } from "react";
import { twMerge } from "tailwind-merge";

const Drawer = ({ heading, children, labelOpen, listClassName }) => {
  return (
    <div className="drawer z-[9999]">
      <input id={labelOpen} type="checkbox" className="drawer-toggle" />
      
      <div className="drawer-side">
        <label htmlFor={labelOpen} aria-label={`close ${labelOpen}`} className="drawer-overlay" />

        <ul className={twMerge("min-h-full px-0 bg-white menu w-72", listClassName)}>
          <li className="p-4 mb-10 text-xl font-bold border-b-[1px] border-stone-400">
            {heading}
          </li>

          {children}
        </ul>
      </div>
    </div>
  );
};

export default memo(Drawer);
