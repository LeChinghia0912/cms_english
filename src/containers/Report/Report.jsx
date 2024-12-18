"use client";

import Rate from "rc-rate";
import { get } from "lodash";
import "rc-rate/assets/index.css";
import { Fragment, useMemo, useState } from "react";

import { HeadLine } from "@/components";
import ViewReport from "./components/ViewReport";

const Report = ({ initData }) => {
  console.log("🚀 ~ Report ~ initData:", initData)
  const reports = get(initData, ["0", "items"]);
  const [report, setReport] = useState(null)

  const renderReports = useMemo(() => {
    if (typeof reports == "undefined") return null;

    return reports.map((el, idx) => (
      <label
        key={idx}
        htmlFor="view-report"
        className="shadow-md rounded-sm border-[1px] border-stone-200 py-3 px-3.5 flex-center min-h-[150px] flex-col gap-3 cursor-pointer hover:opacity-85 transition-base"
        onClick={() => setReport(el)}
      >
        <span className="text-xl font-bold">{el.fullname}</span>
        <span className="font-medium">{el.content}</span>
      </label>
    ));
  }, [reports]);

  return (
    <Fragment>
      <HeadLine title="Report của người dùng" />

      <div className="px-3 pt-8 pb-4 mt-10 mb-10 bg-white rounded-md shadow-md">
        <div className="grid grid-cols-2 gap-5">{renderReports}</div>
      </div>

      {report?._id && <ViewReport key={report._id} report={report} /> }
    </Fragment>
  );
};

export default Report;
