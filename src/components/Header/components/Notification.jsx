import { memo } from "react";

import { BellIcon } from "@radix-ui/react-icons";

const Notification = () => {
  return (
    <div className="relative flex-shrink-0 p-2 cursor-pointer hover:opacity-80 transition-base">
      <BellIcon className="w-7 h-7" />
      <div className="absolute top-0 font-medium text-white -right-1 badge bg-[#D11A2A]">
        9
      </div>
    </div>
  );
};

export default memo(Notification);
