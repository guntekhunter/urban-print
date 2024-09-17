"use client";
import TimeInputs from "@/app/component/template/MountInput";
import { getPrintingTask } from "@/app/fetch/FetchData";
import { dateFormater } from "@/app/functions/DateFormater";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function page() {
  const [orders, setOrders] = useState<any>([]);
  const [mounth, setMounth] = useState("")

  const route = useRouter();

  useEffect(() => {
    const idStatus: string | null = localStorage.getItem("status")
    const idInteger = parseInt(idStatus ?? "0", 10);
    const fetchOrder = async () => {
      try {
        const userId = localStorage.getItem("user_id");
        if (userId !== null) {
          const id = parseInt(userId);
          const task = await getPrintingTask();
          setOrders(task?.data.data); // Update the state with response data
        } else {
          console.log("User ID not found in local storage.");
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchOrder();
  }, []);

  const detailOrders = (id: any) => {
    route.push(`/operator/detail/${id}`);
  };

  const handleDate = async (date: string, name: string) => {
    setMounth(date);
    const [inputYear, inputMonth] = date.split("-");
    const task = await getPrintingTask();


    const theData = task?.data.data;

    const filteredData = theData.filter((item: any) => {
      const [orderYear, orderMonth] = item.order_date.split("-"); // Assuming order_date is in "YYYY-MM-DD" format
      return orderYear === inputYear && orderMonth === inputMonth;
    });

    // Now, filteredData contains only the entries that match the selected month and year
    setOrders(filteredData)
  }

  console.log("ini", orders)
  return (
    <div className="flex justify-around relative pt-[2rem]">
      <div className="p-[3rem] rounded-md shadow-md bg-white text-text w-[95%] space-y-[1rem] text-[.7rem]">
        <h1 className="text-[2rem] font-bold">Printing Orders</h1>
        <TimeInputs onChange={handleDate} name="required_date" />
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
                Required Date
              </th>
              <th className="px-6 py-3 text-left text-gray-500 text-[1rem] text-sm font-medium">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {orders?.map((item: any, key: any) => (
              <tr
                key={key}
                onClick={() => detailOrders(item.id)}
                className="cursor-pointer hover:bg-gray-100"
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  {item.so_number}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{item.custumer}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {item.sales_person}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {dateFormater(item.required_date)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {
                    item.status === 1 ? (
                      <p>Not Started</p>
                    ) : (
                      <p>{item.Status.status}</p>
                    )
                  }

                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
