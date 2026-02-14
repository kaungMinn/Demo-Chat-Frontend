import type { DateRange } from "react-day-picker";

import { addDays } from "date-fns";
import { useState } from "react";

function useDateRange() {
  const [date, setDate] = useState<DateRange | undefined>({
    from: addDays(new Date(), -20),
    to: new Date(),
  });
  return [date, setDate] as const;
}

export default useDateRange;
