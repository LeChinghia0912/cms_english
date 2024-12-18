import { Decentralization } from "@/containers/Decentralization";
import { authOptions } from "../api/auth/[...nextauth]/route";
import UseFetch from "@/hooks/UseFetch";

const page = async () => {

  const { data } = await UseFetch("users");

  return <Decentralization initData={[data]} />;
};

export default page;
