import { Fragment } from "react";

const Modal = ({ labelOpen, heading, children }) => {
  return (
    <Fragment>
      <input type="checkbox" id={labelOpen} className="modal-toggle" />
      <div className="modal" role="dialog">
        <div className="modal-box">
          <h3 className="text-lg font-bold border-b-[1px] border-stone-300 pb-2 mb-4">{heading}</h3>
          {children}
        </div>
        <label className="modal-backdrop" htmlFor={labelOpen} />
      </div>
    </Fragment>
  );
};

export default Modal;
