"use client";
import TimeInputs from "@/app/component/template/MountInput";
import { getCustumer, getPrintingTask } from "@/app/fetch/FetchData";
import { dateFormater } from "@/app/functions/DateFormater";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

interface Order {
  id: number;
  so_number: number;
  quotation_number: number;
  type: string;
  order_date: string;
  required_date: string;
  sales_type: string;
  po_number: number;
  acount_rep: string;
  sales_person: string;
  custumer: string;
  contact_person: string;
  ship_to: string;
  adress: string;
  status: number;
  product_type: string;
  product_width: number;
  product_length: number;
  product_size: string;
  material: string;
  color: string;
  coating: string;
  prize: number;
  quantity: number;
  late: boolean;
  id_operator: number;
  authorId: number;
  Status?: {
    id: number;
    status: string;
  } | null;
}

type OperatorsMap = { [key: number]: string };
type CustumerMap = { [key: number]: string };

export default function page() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [custumer, setCustumer] = useState<CustumerMap>({});

  const route = useRouter();

  useEffect(() => {
    const idStatus: string | null = localStorage.getItem("status")
    const idInteger = parseInt(idStatus ?? "0", 10);
    const fetchOrder = async () => {
      try {
        const userId = localStorage.getItem("user_id");
        if (userId !== null) {
          const id = parseInt(userId);
          const taskData = {
            // id: id,
            type: "printing photography",
            status: idInteger
          };
          const task = await getPrintingTask(taskData);
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

  // get custumer
  useEffect(() => {
    const fetchCustumer = async () => {
      const custumerPromises = orders.map(async (item) => {
        if (item.custumer) {
          const id = parseInt(item.custumer)
          const res = await getCustumer(id);
          return { id: item.custumer, name: res?.data?.data?.name || "" };
        }
        return null;
      });

      const results = await Promise.all(custumerPromises);
      const custumerMap: CustumerMap = {};
      results.forEach((custumer) => {
        if (custumer) { // Check if custumer is not null
          const custumerId = parseInt(custumer.id, 10);
          if (!isNaN(custumerId)) {
            custumerMap[custumerId] = custumer.name;
          }
        }
      });
      setCustumer(custumerMap);
    };

    if (orders) {
      fetchCustumer(); // Fetch operators after orders are loaded
    }
  }, [orders]);

  const detailOrders = (id: any) => {
    route.push(`/operator/detail/${id}`);
  };

  // const handleDate = async (date: string, name: string) => {
  //   const [inputYear, inputMonth] = date.split("-");
  //   const task = await getPrintingTask();


  //   const theData = task?.data.data;

  //   const filteredData = theData.filter((item: any) => {
  //     const [orderYear, orderMonth] = item.order_date.split("-"); // Assuming order_date is in "YYYY-MM-DD" format
  //     return orderYear === inputYear && orderMonth === inputMonth;
  //   });

  //   // Now, filteredData contains only the entries that match the selected month and year
  //   setOrders(filteredData)
  // }

  return (
    <div className="flex justify-around relative pt-[2rem]">
      <div className="p-[3rem] rounded-md shadow-md bg-white text-text w-[95%] space-y-[1rem] text-[.7rem]">
        <h1 className="text-[2rem] font-bold">Printing Orders</h1>
        {/* <TimeInputs onChange={handleDate} name="required_date" /> */}
        <table className="min-w-full divide-y divide-gray-200 rounded-md">
          <thead className="bg-gray-50">
            <tr className="px-6 py-3 text-left text-gray-500 text-[1rem] text-sm font-medium">
              <th className="px-6 py-3 text-left text-gray-500 text-[1rem] text-sm font-medium">
                Sales Order Number
              </th>
              <th className="px-6 py-3 text-left text-gray-500 text-[1rem] text-sm font-medium">
                Customer
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
                <td className="px-6 py-4 whitespace-nowrap">{item.custumer ? custumer[item.custumer] || "Unknown" : "No Operator"}</td>
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
