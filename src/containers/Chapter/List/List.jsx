"use client";

import { get } from "lodash";
import { Fragment } from "react";
import { MixIcon, Pencil2Icon } from "@radix-ui/react-icons";

import { Table } from "@/components/Table";
import Pagination from "@/components/Pagination";
import { Button, HeadLine, Search } from "@/components";
import { CreateChapter, columns } from "@/containers/Chapter";

const Chapter = ({ initData }) => {

  const data = get(initData, ["0", "items"]);
  const pagination = get(initData, ["0", "pagination"]);

  return (
    <Fragment>
      <div className="mt-3 mb-8 flex-between">
        <HeadLine title="Quản Lý Chương" />
        <Button
          title="Bộ Lọc"
          htmlFor="filter"
          component="label"
          iconStart={MixIcon}
          buttonClassName="text-black border-[1px] border-stone-500 bg-transparent hover:bg-transparent"
        />
      </div>

      <div className="px-3 pt-8 pb-4 mb-10 bg-white rounded-md shadow-md">
        <div className="flex-wrap gap-4 mb-7 flex-between">
          <Button
            title="Tạo Mới"
            component="label"
            htmlFor="create-chapter"
            iconStart={Pencil2Icon}
            buttonClassName="bg-red-600 hover:bg-red-500 text-white font-medium"
          />

          <Search />
        </div>

        <Table columns={columns} data={data} />

        <Pagination
          total={pagination?.totalItems}
          current={pagination?.currentPage}
          pageSize={10}
          defaultCurrent={pagination?.currentPage}
        />
      </div>

      <CreateChapter />
      
      {/* <Filter /> */}
    </Fragment>
  );
};

export default Chapter;
