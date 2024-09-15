"use client";
import Button from "@/app/component/template/Button";
import { getSales } from "@/app/fetch/FetchData";
import { dateFormater } from "@/app/functions/DateFormater";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function page() {
  const [sales, setSales] = useState([]);

  const route = useRouter();
  useEffect(() => {
    const fetchSale = async () => {
      try {
        const res = await getSales();
        console.log(res?.data.data);
        setSales(res?.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchSale();
  }, []);

  const detailSale = (id: any) => {
    route.push(`/admin/sale/${id}`);
  };

  return (
    <div className="flex justify-around relative pt-[2rem]">
      <div className="p-[3rem] rounded-md shadow-md bg-white text-text w-[95%] space-y-[1rem] text-[.7rem]">
        <h1 className="text-[2rem] font-bold">Sale</h1>
        <table className="min-w-full divide-y divide-gray-200 rounded-md">
          <thead className="bg-gray-50">
            <tr className="px-6 py-3 text-left text-gray-500 text-[1rem] text-sm font-medium">
              <th className="px-6 py-3 text-left text-gray-500 text-[1rem] text-center font-medium">
                No
              </th>
              <th className="px-6 py-3 text-left text-gray-500 text-[1rem] text-center font-medium">
                Sales Order Number
              </th>
              <th className="px-6 py-3 text-left text-gray-500 text-[1rem] font-medium">
                Product Type
              </th>
              <th className="px-6 py-3 text-left text-gray-500 text-[1rem] font-medium">
                Prize
              </th>
              <th className="px-6 py-3 text-left text-gray-500 text-[1rem] font-medium">
                Finish date
              </th>
              <th className="px-6 py-3 text-left text-gray-500 text-[1rem] font-medium">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sales?.map((item: any, key) => (
              <tr
                key={key}
                className="cursor-pointer hover:bg-gray-100"
                onClick={() => detailSale(item.id)}
              >
                <td className="whitespace-nowrap text-center">{key + 1}</td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  {item.order.so_number}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {item.order.product_type.replace("finishing ", "")}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  }).format(item.order.prize)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {dateFormater(item.date)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{item.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
