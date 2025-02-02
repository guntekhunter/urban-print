"use client";
import ButtonPerformance from "@/app/component/manager/ButtonPerformance";
import { getEvaluation } from "@/app/fetch/FetchData";
import { data } from "autoprefixer";
import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";

type Operator = {
  id: number;
  name: string;
  onProgress: number;
  finish: number;
  late: number;
  performance: number;
};


export default function page() {
  const [data, setData] = useState([])

  useEffect(() => {
    const fetchOperators = async () => {
      try {
        const res = await getEvaluation();
        setData(res?.data.data)
      } catch (error) {
        console.error("Error fetching operators:", error);
      }
    };

    fetchOperators();
  }, []);

  console.log("ini datanya", data)


  return (
    <div className="flex justify-around relative pt-[2rem]">
      <div className="p-[3rem] rounded-md shadow-md bg-white text-text w-[95%] space-y-[1rem] text-[.7rem]">
        <ButtonPerformance />
        <h1 className="text-[2rem] font-bold">Performance List</h1>
        <table className="min-w-full divide-y divide-gray-200 rounded-md">
          <thead className="bg-gray-50">
            <tr className="px-6 py-3 text-left text-gray-500 text-[1rem] text-sm font-medium">
              <th className="px-6 py-3 text-left text-gray-500 text-[1rem] text-sm font-medium">
                Operator Name
              </th>
              <th className="px-6 py-3 text-left text-gray-500 text-[1rem] text-sm font-medium">
                Finish Task
              </th>
              <th className="px-6 py-3 text-left text-gray-500 text-[1rem] text-sm font-medium">
                On Progres
              </th>
              <th className="px-6 py-3 text-left text-gray-500 text-[1rem] text-sm font-medium">
                Late
              </th>
              <th className="px-6 py-3 text-left text-gray-500 text-[1rem] text-sm font-medium">
                Total Score
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {
              data?.map((item: any, key: any) => (
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {item.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.finish}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {item.onProgress}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {item.late}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {Math.round(item.performance)}%
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  );
}
