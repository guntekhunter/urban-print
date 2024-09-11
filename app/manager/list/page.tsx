"use client";
import ButtonPerformance from "@/app/component/manager/ButtonPerformance";
import { getAllOrder } from "@/app/fetch/FetchData";
import { dateFormater } from "@/app/functions/DateFormater";
import Image from "next/image";
import React, { useEffect, useState } from "react";

export default function page() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await getAllOrder();
        console.log(res?.data.data);
        setOrders(res?.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchOrder();
  }, []);
  return (
    <div className="flex justify-around relative pt-[2rem]">
      <div className="p-[3rem] rounded-md shadow-md bg-white text-text w-[95%] space-y-[1rem] text-[.7rem]">
        <ButtonPerformance />
        <h1 className="text-[2rem] font-bold">Data Order</h1>
        <table className="min-w-full divide-y divide-gray-200 rounded-md">
          <thead className="bg-gray-50">
            <tr className="px-6 py-3 text-left text-gray-500 text-[1rem] text-sm font-medium">
              <th className="px-6 py-3 text-left text-gray-500 text-[1rem] text-sm font-medium">
                Sales Order Number
              </th>
              <th className="px-6 py-3 text-left text-gray-500 text-[1rem] text-sm font-medium">
                Custumer
              </th>
              <th className="px-6 py-3 text-left text-gray-500 text-[1rem] text-sm font-medium">
                Sales Person
              </th>
              <th className="px-6 py-3 text-left text-gray-500 text-[1rem] text-sm font-medium">
                Created At
              </th>
              <th className="px-6 py-3 text-left text-gray-500 text-[1rem] text-sm font-medium">
                Required Date
              </th>
              <th className="px-6 py-3 text-left text-gray-500 text-[1rem] text-sm font-medium">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {orders?.map((item: any, key) => (
              <tr key={key} className="cursor-pointer">
                <td className="px-6 py-4 whitespace-nowrap">
                  {item.so_number}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{item.custumer}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {item.sales_person}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {dateFormater(item.order_date)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {dateFormater(item.required_date)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {item.Status.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
