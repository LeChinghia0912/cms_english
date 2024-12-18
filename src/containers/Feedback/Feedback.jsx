"use client";

import Rate from "rc-rate";
import { get } from "lodash";
import "rc-rate/assets/index.css";
import { Fragment, useMemo, useState } from "react";

import { HeadLine } from "@/components";
import { ViewFeedback } from "@/containers/Feedback";

const Feedback = ({ initData }) => {
  const feedbacks = get(initData, ["0", "items"]);
  const [feedback, setFeddback] = useState(null)

  const renderFeedbacks = useMemo(() => {
    if (typeof feedbacks == "undefined") return null;

    return feedbacks.map((el, idx) => (
      <label
        key={idx}
        htmlFor="view-feedback"
        className="shadow-md rounded-sm border-[1px] border-stone-200 py-3 px-3.5 flex-center min-h-[150px] flex-col gap-3 cursor-pointer hover:opacity-85 transition-base"
        onClick={() => setFeddback(el)}
      >
        <span className="text-xl font-bold">{el.fullname}</span>
        <Rate value={el.number_star} />
      </label>
    ));
  }, [feedbacks]);

  return (
    <Fragment>
      <HeadLine title="Feedback của người dùng" />

      <div className="px-3 pt-8 pb-4 mt-10 mb-10 bg-white rounded-md shadow-md">
        <div className="grid grid-cols-2 gap-5">{renderFeedbacks}</div>
      </div>

      {feedback?._id && <ViewFeedback key={feedback._id} feedback={feedback} /> }
    </Fragment>
  );
};

export default Feedback;
