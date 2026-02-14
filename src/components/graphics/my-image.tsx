import { LazyLoadImage } from "react-lazy-load-image-component";

// Define the shape of the data object you expect to receive
type ImageProps = {
  src: string;
  alt: string;
  height?: number | string;
  width?: number | string;
};

function MyImage(props: ImageProps) {
  return (
    <div>
      <LazyLoadImage
        alt={props.alt}
        height={props.height || 60}
        src={props.src}
        width={props.width || 60}
      />
    </div>
  );
}

export default MyImage;
