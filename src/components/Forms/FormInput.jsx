// import { AlertIcon } from "@/assets/icons";
import { twMerge } from "tailwind-merge";
import { useController } from "react-hook-form";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

const Form = (props) => {
  const {
    name,
    label,
    control,
    inputClassName,
    inputType,
    placeholder,
    labelClassName,
    containerClassName,
    defaultValue,
  } = props;

  const {
    field: { value, onChange, ...restProps },
    fieldState: { error },
  } = useController({
    name,
    control,
    defaultValue,
    rules: { required: true },
  });

  return (
    <div className={twMerge("w-full", containerClassName)}>
      <label
        htmlFor={name}
        className={twMerge("font-medium w-fit mb-2 block", labelClassName)}
      >
        {label}
      </label>

      <div className="relative">
        <input
          id={name}
          value={value}
          autoComplete="off"
          type={inputType ?? "text"}
          placeholder={placeholder}
          onChange={onChange}
          defaultValue={defaultValue}
          className={twMerge(
            "bg-transparent rounded-md input focus:outline-none w-full border !border-[#cccccc] p-3",
            error?.message ? "border-red-900" : "border-blue",
            inputClassName
          )}
          {...restProps}
        />

        <ExclamationTriangleIcon
          className={`absolute -translate-y-1/2 right-4 top-1/2 text-error ${
            error?.message ? "block" : "hidden"
          }`}
        />
      </div>

      <span
        className={twMerge(
          "text-xs font-light text-error mt-2 text-left",
          error?.message ? "block" : "hidden"
        )}
      >
        {error?.message}
      </span>
    </div>
  );
};

export default Form;
