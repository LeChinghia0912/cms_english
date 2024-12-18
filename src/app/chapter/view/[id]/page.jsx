import { Detail } from "@/containers/Chapter";
import UseFetch from "@/hooks/UseFetch";
import { notFound } from "next/navigation";

const page = async ({ params, searchParams }) => {
  const param = await params;
  const searchParam = await searchParams;

  if (!param.id) return notFound();

  const { data: chapter } = await UseFetch(`chapter/${param.id}`);

  const { data: lessons } = await UseFetch(chapter.slug);

  let questions = []

  if(searchParam.lesson_slug) {
    questions = await UseFetch(`${chapter.slug}/${searchParam.lesson_slug}`);
  }

  console.log(questions)


  return <Detail initData={[chapter, lessons, questions]} />;
};

export default page;
