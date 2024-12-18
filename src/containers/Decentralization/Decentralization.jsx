"use client";

import { get } from "lodash";
import { Fragment } from "react";
import { Pencil2Icon } from "@radix-ui/react-icons";

import { columns } from "./constants";
import { Table } from "@/components/Table";
import { Button, HeadLine, Search } from "@/components";

const Decentralization = ({ initData }) => {
  const data = get(initData, ["0", "items"]);

  return (
    <Fragment>
      <HeadLine title="Danh Sách Người Dùng" containerClassName="mt-3 mb-8" />

      <div className="px-3 pt-8 pb-4 mb-10 bg-white rounded-md shadow-md">
        <div className="flex-wrap gap-4 mb-7 flex-between">
          <Button
            title="Tạo Mới"
            component="label"
            htmlFor="create-post"
            iconStart={Pencil2Icon}
            buttonClassName="bg-red-600 hover:bg-red-500 text-white font-medium"
          />

          <Search />
        </div>

        <Table columns={columns} data={data} />
      </div>

      {/* <CreatePost /> */}
    </Fragment>
  );
};

export default Decentralization;
