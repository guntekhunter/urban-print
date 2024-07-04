"use client";
import React, { useState } from "react";

export default function TimeInputs(prop: any) {
  const handleDate = (e: any) => {
    prop.onChange(e.target.value, prop.name);
  };
  return (
    <div className="w-full">
      <input
        type="datetime-local"
        className="appereance-none border rounded py-3 px-2 text-gray-500 w-full w-full h-[2rem] px-[1rem] rounded-md border-[1.4px] border-gray-200 text-[.9rem]"
        onChange={handleDate}
      />
    </div>
  );
}
