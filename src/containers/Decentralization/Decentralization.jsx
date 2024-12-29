"use client";

import { get } from "lodash";
import { Fragment } from "react";
import { Pencil2Icon } from "@radix-ui/react-icons";

import { columns } from "./constants";
import { Table } from "@/components/Table";
import { Button, HeadLine, Search } from "@/components";
import CreateDecentralization from "./components/CreateDecentralization";
import Pagination from "@/components/Pagination";

const Decentralization = ({ initData }) => {
  const data = get(initData, ["0", "items"]);
  const pagination = get(initData, ["0", "pagination"]);

  return (
    <Fragment>
      <HeadLine title="Danh Sách Người Dùng" containerClassName="mt-3 mb-8" />

      <div className="px-3 pt-8 pb-4 mb-10 bg-white rounded-md shadow-md">
        <div className="flex-wrap gap-4 mb-7 flex-between">
          <Button
            title="Tạo Mới"
            component="label"
            htmlFor="create-decentralization"
            iconStart={Pencil2Icon}
            buttonClassName="bg-red-600 hover:bg-red-500 text-white font-medium"
          />

          <Search />
        </div>

        <Table columns={columns} data={data} />
      </div>

      <CreateDecentralization />

      <Pagination
        total={pagination?.totalItems}
        current={pagination?.currentPage}
        pageSize={10}
        defaultCurrent={pagination?.currentPage}
      />
    </Fragment>
  );
};

export default Decentralization;
