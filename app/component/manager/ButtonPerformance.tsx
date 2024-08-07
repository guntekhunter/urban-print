"use client";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function ButtonPerformance(props: any) {
  const path = usePathname();
  const route = useRouter();

  const changePage = (path: string) => {
    route.push(path);
  };

  useEffect(() => {}, []);

  return (
    <div className="flex justify-between space-x-[1rem]">
      <button
        className={`w-full px-[2rem] py-[1rem] rounded-t-lg ${
          path.includes("/list")
            ? "bg-white shadow-[0_-7px_10px_.5px_rgba(0,0.1,0.1,0.1)]"
            : "bg-[#F6F6F6]"
        }`}
        onClick={() => changePage("list")}
      >
        List
      </button>
      <button
        className={`w-full px-[2rem] py-[1rem] rounded-t-lg ${
          path.includes("/workin-progress")
            ? "bg-white shadow-[0_-7px_10px_.5px_rgba(0,0.1,0.1,0.1)]"
            : "bg-[#F6F6F6]"
        }`}
        onClick={() => changePage("workin-progress")}
      >
        Workin Progress
      </button>
      <button
        className={`w-full px-[2rem] py-[1rem] rounded-t-lg ${
          path.includes("/performance")
            ? "bg-white shadow-[0_-7px_10px_.5px_rgba(0,0.1,0.1,0.1)]"
            : "bg-[#F6F6F6]"
        }`}
        onClick={() => changePage("performance")}
      >
        Performance
      </button>
    </div>
  );
}
