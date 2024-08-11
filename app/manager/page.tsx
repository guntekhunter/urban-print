"use client";
import { useRouter } from "next/navigation";
import React from "react";

export default function page() {
  const route = useRouter();
  const hendleChange = (path: any) => {
    route.push(`/manager/${path}`);
  };
  return (
    <div className="flex justify-around relative pt-[2rem]">
      <div className="p-[3rem] rounded-md shadow-md bg-white text-text w-[95%] text-[.7rem] flex space-x-[3rem] text-[1rem] text-gray-700 flex text-white">
        <button
          className="bg-red-400 px-[3.5rem] py-[3rem] rounded-md w-[30%] hover:bg-red-300"
          onClick={(e) => hendleChange("daily-report")}
        >
          Daily Report
        </button>
        <button
          className="bg-green-400 px-[3.5rem] py-[3rem] rounded-md w-[30%] hover:bg-green-300"
          onClick={(e) => hendleChange("montly-report")}
        >
          Monthly Report
        </button>
        <button
          className="bg-yellow-400 px-[3.5rem] py-[3rem] rounded-md w-[30%] hover:bg-yellow-300"
          onClick={(e) => hendleChange("performance")}
        >
          Operator Performance
        </button>
      </div>
    </div>
  );
}
