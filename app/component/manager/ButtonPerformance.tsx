"use client";
import { useRouter } from "next/navigation";
import React from "react";

export default function ButtonPerformance(props: any) {
  const route = useRouter();

  const changePage = (path: string) => {
    route.push(path);
  };
  return (
    <div className="flex justify-between space-x-[1rem]">
      <button
        className="bg-red-200 w-full px-[2rem] py-[1rem]"
        onClick={() => changePage("list")}
      >
        List
      </button>
      <button
        className="bg-red-200 w-full px-[2rem] py-[1rem]"
        onClick={() => changePage("workin-progress")}
      >
        Workin Progress
      </button>
      <button
        className="bg-red-200 w-full px-[2rem] py-[1rem]"
        onClick={() => changePage("performance")}
      >
        Performance
      </button>
      <button
        className="bg-red-200 w-full px-[2rem] py-[1rem]"
        onClick={() => changePage("evaluation")}
      >
        Evaluation
      </button>
    </div>
  );
}
