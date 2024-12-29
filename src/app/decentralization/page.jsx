import { Decentralization } from "@/containers/Decentralization";
import { authOptions } from "../api/auth/[...nextauth]/route";
import UseFetch from "@/hooks/UseFetch";

const page = async ({ searchParams }) => {
  const searchParam = await searchParams;

  const { data } = await UseFetch("users?" + new URLSearchParams({ page: searchParam?.page }));

  return <Decentralization initData={[data]} />;
};

export default page;
