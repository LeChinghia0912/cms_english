import UseFetch from "@/hooks/UseFetch";

import { List } from "@/containers/Chapter";

const page = async({ searchParams }) => {
  const params = await searchParams;

  const { data } = await UseFetch("chapters?" + new URLSearchParams({ page: params.page || 1, search: params.search || "" }));

  return <List initData={[data]} />
}

export default page