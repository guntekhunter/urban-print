"use client";
import { usePathname } from "next/navigation";
import React from "react";

export default function SideBar() {
  const path = usePathname();

  if (path === "/") {
    return <></>;
  } else if (path.includes("/manager")) {
    return (
      <div className="bg-white shadow-md bg-white w-[20%] flex-col p-[2rem] space-y-[1rem] relative">
        <div className="fixed w-[10rem]">
          <ul className="space-y-[1rem]">
            <li className="cursor-pointer border-b-[1px] hover:border-gray-200 border-transparent  transform duration-200 pb-[.5rem] hover:text-gray-400 ">
              Dashboard
            </li>
          </ul>
        </div>
      </div>
    );
  }
}
