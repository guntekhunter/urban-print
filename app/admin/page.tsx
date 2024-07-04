"use client";
import React, { useEffect, useState } from "react";
import Button from "../component/template/Button";
import { deleteOrder, getAllOrder } from "../fetch/FetchData";
import { dateFormater } from "../functions/DateFormater";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function page() {
  const [orders, setOrders] = useState([]);

  const route = useRouter();

  const handleDelete = async (id: any) => {
    try {
      const res = await deleteOrder(id);
      setOrders(res?.data.response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCreateOrder = () => {
    route.push("/admin/create-order");
  };

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
        <h1 className="text-[2rem] font-bold">Data Order</h1>
        <Button onClick={handleCreateOrder}>Tambah Orderan</Button>
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
              <th className="px-6 py-3 text-left text-gray-500 text-[1rem] text-sm font-medium">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {orders?.map((item: any, key) => (
              <tr key={key}>
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
                  {item.Status.status}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap flex justify-between py-[1rem]">
                  <button
                    className="p-[.5rem] bg-red-200 border-red-300 border-[1.3px] rounded-md"
                    onClick={(e) => {
                      handleDelete(item.id);
                    }}
                  >
                    <Image
                      src="/delete.png"
                      alt=""
                      width={500}
                      height={500}
                      className="w-4"
                    />
                  </button>
                  <div className="p-[.5rem] bg-green-200 border-green-300 border-[1.3px] rounded-md">
                    <Image
                      src="/editing.png"
                      alt=""
                      width={500}
                      height={500}
                      className="w-4"
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
