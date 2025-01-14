import { Actions } from "@/components/Table";

export const columns = [
  {
    title: "#",
    dataIndex: "_id",
    key: "_id",
  },
  {
    title: "Tên đầy đủ",
    dataIndex: "fullname",
    key: "fullname",
    width: 500
  },
  {
    title: "Quyền",
    dataIndex: "role",
    key: "role",
    width: 500,
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
    width: 500,
  },
  {
    title: "Chức Năng",
    dataIndex: "",
    key: "operations",
    width: 150,
    render: (data) => <Actions id={data._id} path={"auth/deleted"} />
  },
];
