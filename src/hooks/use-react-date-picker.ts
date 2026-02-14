import { useState } from "react";

// import "react-datepicker/dist/react-datepicker.min.css";

// import "./date.styles.css";

export type OnDateTimeChangeType = (e: any) => void;
export type HandleTimePickerColorType = (time: any) => string;
export type DateTimeType = Date | undefined;

type HookReturnType = [
    dateTime: DateTimeType,
    onDateTimeChange: OnDateTimeChangeType,
    handleTimePickerColor: HandleTimePickerColorType,
];

function useReactDatePicker(): HookReturnType {
  // state
  const [dateTime, setDateTime] = useState<Date | undefined>();

  // handle date
  const onDateTimeChange = (e: any) => {
    const now = new Date();
    if (e && e <= now) {
      // eslint-disable-next-line no-alert
      return alert("You cannot schedule past time!");
    }
    setDateTime(e);
  };

  // handle date picker
  const handleTimePickerColor = (time: any): string => {
    let cLs = "";
    const d = new Date();
    const dt = d.getHours();
    const tt = time.getHours();
    if (tt > dt) {
      cLs = "text-green-500";
    }
    if (tt < dt) {
      cLs = "text-red-500";
    }
    if (tt === dt) {
      const ttm = time.getMinutes();
      const dtm = d.getMinutes() + 5;
      if (ttm > dtm) {
        cLs = "text-green-500";
      }
      else {
        cLs = "text-red-500";
      }
    }
    return cLs;
  };
  return [dateTime, onDateTimeChange, handleTimePickerColor];
}

export default useReactDatePicker;
