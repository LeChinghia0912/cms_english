import { twMerge } from "tailwind-merge";

const HeadLine = ({ title, containerClassName, ...restProps }) => {
  return (
    <h2
      className={twMerge("text-2xl font-bold", containerClassName)}
      {...restProps}
    >
      {title}
    </h2>
  );
};

export default HeadLine;
