import { twMerge } from "tailwind-merge";
import Image from "next/image";

const defaultBlurDataURL =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=";

const ImageWithFallback = (props) => {
  const { fallbackSrc, alt, className, src, ...rest } = props;

  return (
    <Image
      alt={alt}
      src={src}
      unoptimized={true}
      className={twMerge("relative z-[2]", className)}
      blurDataURL={defaultBlurDataURL}
      {...rest}
    />
  );
};

export default ImageWithFallback;
