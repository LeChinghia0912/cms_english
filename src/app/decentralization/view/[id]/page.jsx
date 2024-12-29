import DetailUser from "@/containers/Decentralization/Detail/Detail";
import UseFetch from "@/hooks/UseFetch";
import { notFound } from "next/navigation";

const page = async ({ params }) => {
  const param = await params;

  if (!param.id) return notFound();

  const { data } = await UseFetch(`auth/users/${param.id}`);

  return <DetailUser initData={[data]} />;
};

export default page;
