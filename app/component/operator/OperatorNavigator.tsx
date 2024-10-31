"use client"
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function OperatorNavigator() {
  const [dateTime, setDateTime] = useState(new Date());
  const path = usePathname();
  const route = useRouter();

  const changePage = (path: string) => {
    route.push(path);
  };
  console.log(path);

  useEffect(() => {
    const timer = setInterval(() => setDateTime(new Date()), 1000);
    return () => clearInterval(timer); // Clean up the interval on unmount
  }, []);

  const formattedDate = dateTime.toLocaleDateString();
  const formattedTime = dateTime.toLocaleTimeString();
  return (
    <div className={`w-[40%] flex`}>
      <div
        onClick={() => changePage("/operator")}
        className={`px-[1rem] py-[.5rem] rounded-tr-[20px] rounded-tl-[5px] cursor-pointer ${path === "/operator/finishing-task" ? "bg-gray-200" : "bg-white"
          }`}
      >
        Printing
      </div>
      <div
        onClick={() => changePage("/operator/finishing-task")}
        className={`px-[1rem] py-[.5rem] rounded-tr-[20px] rounded-tl-[5px] cursor-pointer ${path === "operator/finishing-task" ? "bg-gray-200" : "bg-white "
          }`}
      >
        Finishing
      </div>
      <div
        // onClick={() => changePage("operator/finishing-task")}
        className={`px-[1rem] py-[.5rem] w-full rounded-tr-[20px] rounded-tl-[5px] bg-gray-200 w-[10rem]`}
      >
        <p className="flex">
          Date: {formattedDate} Time : {formattedTime}
        </p>
      </div>
    </div>
  );
}
