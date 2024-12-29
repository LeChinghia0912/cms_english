import UseFetch from "@/hooks/UseFetch";
import UpdateUser from "@/containers/Decentralization/Update/Update";

const page = async ({ params }) => {
  const param = await params;

  if (!param.id) return notFound();

  const { data } = await UseFetch(`auth/users/${param.id}`);

  return <UpdateUser initData={[data]} />;
};

export default page;
