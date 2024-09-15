"use client";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";

export default function SideBar() {
  const path = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const route = useRouter();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const handleChangePage = (e: any) => {
    if (path.includes("manager")) {
      route.push(`/manager/${e}`);
    } else if (path.includes("admin")) {
      route.push(`/admin/${e}`);
    }
  };
  console.log(path);

  if (path === "/") {
    return <></>;
  } else if (path.includes("/manager")) {
    return (
      <div className="bg-white h-screen shadow-md w-[20%] p-[2rem] space-y-[1rem] relative">
        <div className="fixed w-[10rem] h-[100vh]">
          <ul className="space-y-[1rem]">
            <li
              onClick={() => handleChangePage("")}
              className={`cursor-pointer border-b-[1px] hover:border-gray-200 border-transparent transform duration-200 pb-[.5rem] hover:text-black text-[.8rem] ${
                path === "/manager"
                  ? "text-black border-gray-200 font-bold"
                  : "text-gray-600"
              }`}
            >
              Dashboard
            </li>
            {path.includes("manager") ? (
              <>
                <li
                  onClick={() => handleChangePage("daily-report")}
                  className={`cursor-pointer border-b-[1px] hover:border-gray-200 transform duration-200 pb-[.5rem] hover:text-black text-[.8rem] ${
                    path.includes("daily-report")
                      ? "text-black border-gray-200 font-bold"
                      : "text-gray-600 border-transparent"
                  }`}
                >
                  Daily Report
                </li>
                <li
                  onClick={() => handleChangePage("montly-report")}
                  className={`cursor-pointer border-b-[1px] hover:border-gray-200 transform duration-200 pb-[.5rem] hover:text-black text-[.8rem] ${
                    path.includes("montly-report")
                      ? "text-black border-gray-200 font-bold"
                      : "text-gray-600 border-transparent"
                  }`}
                >
                  Monthly Report
                </li>
                <li
                  onClick={toggleMenu}
                  className={`cursor-pointer border-b-[1px] hover:border-gray-200 transform duration-200 pb-[.5rem] hover:text-black text-[.8rem] ${
                    path.includes("performance")
                      ? "text-black border-gray-200 font-bold"
                      : "text-gray-600 border-transparent"
                  } flex justify-between items-center group`}
                >
                  <p>Performance</p>
                  <div className="h-full items-center flex align-center">
                    <Image
                      src="/the-arrow.png"
                      alt=""
                      height={300}
                      width={300}
                      className="w-[.3rem] h-[.5rem] transform group-hover:rotate-90 duration-200"
                    />
                  </div>
                </li>
                <ul
                  className={`ml-[1rem] overflow-hidden transition-all duration-300 space-y-[.5rem] ${
                    isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <li
                    onClick={() => handleChangePage("performance")}
                    className={`cursor-pointer border-b-[1px] hover:border-gray-200 transform duration-200 pb-[.5rem] hover:text-black text-[.8rem] ${
                      path.includes("performance")
                        ? "text-black border-gray-200 font-bold"
                        : "text-gray-600 border-transparent"
                    }`}
                  >
                    Performance Detail
                  </li>
                  <li
                    onClick={() => handleChangePage("workin-progress")}
                    className={`cursor-pointer border-b-[1px] hover:border-gray-200 transform duration-200 pb-[.5rem] hover:text-black text-[.8rem] ${
                      path.includes("workin-progress")
                        ? "text-black border-gray-200 font-bold"
                        : "text-gray-600 border-transparent"
                    }`}
                  >
                    Work In Progress
                  </li>
                  <li
                    onClick={() => handleChangePage("list")}
                    className={`cursor-pointer border-b-[1px] hover:border-gray-200 transform duration-200 pb-[.5rem] hover:text-black text-[.8rem] ${
                      path.includes("list")
                        ? "text-black border-gray-200 font-bold"
                        : "text-gray-600 border-transparent"
                    }`}
                  >
                    Work List
                  </li>
                </ul>
              </>
            ) : null}
          </ul>
        </div>
      </div>
    );
  } else if (path.includes("/admin")) {
    return (
      <div className="sticky top-0 bg-white h-screen shadow-md w-[20%] p-[2rem] space-y-[1rem]">
        <div className="fixed w-[10rem] h-[100vh]">
          <ul className="space-y-[1rem]">
            <li
              onClick={() => handleChangePage("")}
              className={`cursor-pointer border-b-[1px] hover:border-gray-200 border-transparent transform duration-200 pb-[.5rem] hover:text-black text-[.8rem] ${
                path === "/admin"
                  ? "text-black border-gray-200 font-bold"
                  : "text-gray-600"
              }`}
            >
              Dashboard
            </li>

            <li
              onClick={() => handleChangePage("create-order")}
              className={`cursor-pointer border-b-[1px] hover:border-gray-200 transform duration-200 pb-[.5rem] hover:text-black text-[.8rem] ${
                path.includes("create-order")
                  ? "text-black border-gray-200 font-bold"
                  : "text-gray-600 border-transparent"
              }`}
            >
              Tambah Order
            </li>
            <li
              onClick={() => handleChangePage("add-custumer")}
              className={`cursor-pointer border-b-[1px] hover:border-gray-200 transform duration-200 pb-[.5rem] hover:text-black text-[.8rem] ${
                path.includes("add-custumer")
                  ? "text-black border-gray-200 font-bold"
                  : "text-gray-600 border-transparent"
              }`}
            >
              Tambah Custumer
            </li>
            <li
              onClick={() => handleChangePage("sale")}
              className={`cursor-pointer border-b-[1px] hover:border-gray-200 transform duration-200 pb-[.5rem] hover:text-black text-[.8rem] ${
                path.includes("sale")
                  ? "text-black border-gray-200 font-bold"
                  : "text-gray-600 border-transparent"
              }`}
            >
              Sale
            </li>
          </ul>
        </div>
      </div>
    );
  }
}
