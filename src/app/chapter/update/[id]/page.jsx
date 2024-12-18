import { Update } from "@/containers/Chapter";
import UseFetch from "@/hooks/UseFetch";

const page = async ({ params }) => {
  const param = await params;

  if (!param.id) return notFound();

  const { data } = await UseFetch(`chapter/${param.id}`);

  return <Update initData={[data]} />;
};

export default page;
