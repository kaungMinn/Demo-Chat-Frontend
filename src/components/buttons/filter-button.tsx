import { useEffect, useMemo, useState } from "react";

import { cn } from "@/lib/utils";
import { dataUtils } from "@/utils/data";

import { Button } from "../ui/button";
import { ButtonGroup } from "../ui/button-group";
import { SheetClose, SheetTrigger } from "../ui/sheet";

function FilterButton({ defaultFilters, paramFilters, handleReset}: { defaultFilters: Record<string, any>; paramFilters: Record<string, any>; handleReset: () => void }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const count = dataUtils.countFilter<Record<string, any>>(defaultFilters, paramFilters, []);
    setCount(count);
  }, [paramFilters]);
  return (
    <ButtonGroup>
      <SheetTrigger asChild>
        <Button variant="outline" className="relative">
          Filters
          {count !== 0 && <span className="absolute bg-green-700 text-xs text-white rounded-full w-4 h-4 -top-1 shadow-sm right-0 flex items-center justify-center animate-bounce ">{count}</span>}
        </Button>
      </SheetTrigger>

      <Button variant="destructive" onClick={handleReset}>Clear</Button>
    </ButtonGroup>
  );
}

export function AnimatedFilterButton({ data, defaultData}: { data: Record<string, any>; defaultData: Record<string, any> }) {
  const hasAnimate = useMemo(() => {
    const count = dataUtils.countFilter<Record<string, any>>(defaultData, data, []);
    return count > 0;
  }, [data]);
  return (
    <SheetClose asChild>
      <Button
        type="submit"
        className={cn(
          hasAnimate && "animate-bounce",
        )}
      >
        Filter
      </Button>
    </SheetClose>
  );
}

export default FilterButton;
