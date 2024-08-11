"use client";
import React, { useState, useEffect } from "react";

export default function TimeInputs(prop: any) {
  const [date, setDate] = useState("");

  useEffect(() => {
    if (prop.name === "order_date") {
      const currentDate = new Date();
      const year = currentDate.getFullYear();
      const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Ensure month is two digits
      const localDate = `${year}-${month}`; // Format YYYY-MM
      setDate(localDate);

      if (typeof prop.onChange === "function") {
        prop.onChange(localDate, prop.name);
      }
    }
  }, [prop.name]);

  const handleDate = (e: any) => {
    setDate(e.target.value);

    if (typeof prop.onChange === "function") {
      prop.onChange(e.target.value, prop.name);
    }
  };

  return (
    <div className="w-full">
      <input
        type="month"
        value={date}
        className="appearance-none border rounded py-3 px-2 text-gray-500 w-full h-[2rem] px-[1rem] rounded-md border-[1.4px] border-gray-200 text-[.9rem]"
        onChange={handleDate}
        disabled={prop.name === "order_date"}
      />
    </div>
  );
}
