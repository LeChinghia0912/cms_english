import { Modal } from "@/components";

const ViewFeedback = ({ feedback }) => {
  return (
    <Modal labelOpen="view-feedback" heading="Chi tiết feedback">
      <div className="flex flex-col gap-1">
        <div>
          <span className="mr-1 font-bold">Người gửi:</span>
          <span>{feedback.fullname}</span>
        </div>
        <div>
          <span className="mr-1 font-bold">Nội dung: </span>
          <span>{feedback.content}</span>
        </div>
        <div>
          <span className="mr-1 font-bold">Số đánh giá sao: </span>
          <span>{feedback.number_star}</span>
        </div>
      </div>
    </Modal>
  );
};

export default ViewFeedback;
