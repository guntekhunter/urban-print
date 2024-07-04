import React, { useEffect, useState } from "react";
import { DatePicker } from "@nextui-org/date-picker";

export default function Datepicker(prop: any) {
  const handleDateChange = (newValue: any) => {
    const newDate = `${newValue.day}-${newValue.month}-${newValue.year}`;
    prop.onChange(newDate, prop.name);
  };

  return (
    <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
      <DatePicker
        className=""
        variant="flat"
        aria-label="date"
        onChange={handleDateChange}
      />
    </div>
  );
}
