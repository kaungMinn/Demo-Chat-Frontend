import { ImageOff, User } from "lucide-react";

import { dataUtils } from "@/utils/data";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

function CellImageViewer({ path = "", type = "Profile" }: { path: string; type?: "Profile" | "Content" }) {
  return (
    <div className="flex items-center justify-center ">
      {
        type === "Profile" && (
          <Avatar>
            <AvatarImage src={dataUtils.imgURL(path, "small")} />
            <AvatarFallback><User className="text-gray-400" size={15} /></AvatarFallback>
          </Avatar>
        )
      }

      {
        type === "Content" && (
          <Avatar className=" rounded-none h-14 w-14">
            <AvatarImage className=" rounded-none" src={dataUtils.imgURL(path, "small")} />
            <AvatarFallback className="rounded-none">
              <ImageOff
                className="rounded-none bg-gray-100 text-gray-300 p-2"
                size={35}
              />
            </AvatarFallback>
          </Avatar>
        )
      }
    </div>
  );
}

export default CellImageViewer;
