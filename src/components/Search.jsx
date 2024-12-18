"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const Search = () => {
  const { push } = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const page = searchParams.get("page");

  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    if (searchValue && searchValue !== "") {
      push(`${pathname}?page=${page}&search=${searchValue}`);
    }else {
      push(`${pathname}?page=${page}`);
    }
  }, [searchValue]);

  return (
    <input
      placeholder="Search Here"
      className="py-1.5 px-4 rounded-md border-[1px] border-stone-300"
      onChange={(e) => setSearchValue(e.target.value)}
    />
  );
};

export default Search;
