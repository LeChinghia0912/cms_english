import { Report } from "@/containers/Report";
import UseFetch from "@/hooks/UseFetch";

const page = async () => {
  const { data } = await UseFetch("reports");

  return <Report initData={[data]} />;
};

export default page;
