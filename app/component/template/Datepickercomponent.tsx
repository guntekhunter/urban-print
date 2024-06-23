'use client'
import React, { useState } from 'react';
import Datepicker, { DateValueType } from "react-tailwindcss-datepicker";

export default function Datepickercomponent() {
  const [value, setValue] = useState<DateValueType>({
    startDate: new Date(),
    endDate: new Date(new Date().setMonth(11))
  });
  
  const handleValueChange = (newValue: DateValueType, e?: HTMLInputElement | null) => {
    console.log("newValue:", newValue);
    setValue(newValue);
  };

  return (
    <div>
      <Datepicker value={value} onChange={handleValueChange} />
    </div>
  );
}
