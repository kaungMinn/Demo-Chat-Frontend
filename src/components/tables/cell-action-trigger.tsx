import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { Settings } from "lucide-react";

import { Button } from "@/components/ui/button";

function CellActionTrigger() {
  return (
    <DropdownMenuTrigger asChild>
      <Button variant="default" className="h-8 w-8 p-0 cursor-pointer group">
        <span className="sr-only">Open Menu</span>
        <Settings className="h-4 w-4 group-hover:animate-spin" />
      </Button>
    </DropdownMenuTrigger>
  );
}

export default CellActionTrigger;
