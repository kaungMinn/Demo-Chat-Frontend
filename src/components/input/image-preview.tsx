import { useState } from "react";

import { Input } from "../ui/input";

function ImagePreview() {
  const [selectedImage, setSelectedImage] = useState<string>();

  return (
    <div>
      <Input
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files?.[0];
          setSelectedImage(file ? URL.createObjectURL(file) : undefined);
        }}
      />

      {
        selectedImage && <img src={selectedImage} width={200} height={200} alt="Selected avatar" className="max-h-[400px] object-contain mt-5 rounded-xl" />
      }
    </div>
  );
}

export default ImagePreview;
