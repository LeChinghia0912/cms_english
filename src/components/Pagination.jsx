"use client";

import { twMerge } from "tailwind-merge";
import RcPagination from "rc-pagination";
import { memo, useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";

const Pagination = ({ className, ...restProps }) => {
  const { total } = restProps;

  const { push } = useRouter();
  const pathname = usePathname();

  const handlePagination = useCallback(
    (currentPage) => {
      // setPage(currentPage, { shallow: false });
      push(`${pathname}?page=${currentPage}`);

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    },
    []
  );

  return (
    <div  className="gap-4 mt-8 mb-3 flex-between max-sm:justify-center max-sm:flex-col">
      <span className="font-medium">Tổng cộng có {total} chương học</span>
      
      <RcPagination
        prevIcon={<ChevronLeftIcon />}
        nextIcon={<ChevronRightIcon />}
        showLessItems
        showQuickJumper={false}
        showPrevNextJumpers={false}
        onChange={handlePagination}
        className={twMerge("flex text-center justify-end flex-wrap items-end", className)}
        {...restProps}
        />
    </div>
  );
};

export default memo(Pagination);
