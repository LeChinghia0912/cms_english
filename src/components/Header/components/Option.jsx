"use client";

import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

const Option = ({ href, label, icon: Icon, type }) => {
  const { push } = useRouter;

  const handleClick = () => {
    if (type === "link") {
      push(href);
    } else {
      signOut("/login", { callbackUrl: "/login" });
    }
  };

  return (
    <li>
      <div onClick={handleClick}>
        <Icon />
        {label}
      </div>
    </li>
  );
};

export default Option;
