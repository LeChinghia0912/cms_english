import { Feedback } from "@/containers/Feedback";
import UseFetch from "@/hooks/UseFetch";

const page = async() => {
  const { data } = await UseFetch("feedbacks");

  return <Feedback initData={[data]} />;
};

export default page;
