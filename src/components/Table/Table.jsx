"use client";

import RcTable from "rc-table";

const Table = ({ data, columns, ...restProps }) => {
  return (
    <div className="overflow-auto">
      <RcTable
        data={data}
        className="table max-h-[60vh]"
        columns={columns}
        tableLayout="auto"
        rowKey="_id"
        {...restProps}
      />
    </div>
  );
};

export default Table;
