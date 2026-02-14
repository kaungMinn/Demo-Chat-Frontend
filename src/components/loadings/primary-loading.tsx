import { Loader } from "lucide-react";

function PrimaryLoading() {
  return (
    <div className="flex items-center gap-2 ">
      <span>L</span>
      <Loader className="animate-spin" />

      <span>A</span>
      <span>D</span>
      <span>I</span>
      <span>N</span>
      <span>G</span>
    </div>
  );
}

export default PrimaryLoading;
