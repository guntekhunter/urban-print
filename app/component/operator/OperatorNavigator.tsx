import { usePathname, useRouter } from "next/navigation";
import React from "react";

export default function OperatorNavigator() {
  const path = usePathname();
  const route = useRouter();

  const changePage = (path: string) => {
    route.push(path);
  };
  console.log(path);
  return (
    <div className={`w-[20%] flex`}>
      <div
        onClick={() => changePage("/operator")}
        className={`px-[1rem] py-[.5rem] rounded-tr-[20px] rounded-tl-[5px] cursor-pointer ${
          path === "/operator/finishing-task" ? "bg-gray-200" : "bg-white"
        }`}
      >
        Printing
      </div>
      <div
        onClick={() => changePage("/operator/finishing-task")}
        className={`px-[1rem] py-[.5rem] rounded-tr-[20px] rounded-tl-[5px] cursor-pointer ${
          path === "operator/finishing-task" ? "bg-gray-200" : "bg-white "
        }`}
      >
        Finishing
      </div>
    </div>
  );
}
