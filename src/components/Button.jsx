import { twMerge } from "tailwind-merge";

const Button = ({
  title,
  iconStart: IconStart,
  iconEnd: IconEnd,
  component: Component = "button",
  buttonClassName,

  ...restProps
}) => {
  return (
    <Component className={twMerge("btn", buttonClassName)} {...restProps}>
      {IconStart && <IconStart className="w-4 h-4" />}
      {title}
      {IconEnd && <IconEnd />}
    </Component>
  );
};

export default Button;
