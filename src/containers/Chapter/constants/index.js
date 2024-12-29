import { Actions } from "@/components/Table";

export const columns = [
  {
    title: "#",
    dataIndex: "_id",
    key: "_id",
  },
  {
    title: "Tên Chương",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Nội Dung Chương",
    dataIndex: "title",
    key: "title",
    width: 500,
  },
  {
    title: "Slug",
    dataIndex: "slug",
    key: "slug",
    width: 500,
  },
  {
    title: "Chức Năng",
    dataIndex: "",
    key: "operations",
    width: 150,
    render: (data) => <Actions id={data._id} path={"chapter/deleted"} />
  },
];
