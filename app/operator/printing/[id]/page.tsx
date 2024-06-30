"use client";
import { getOrder, postFinish, postStatus } from "@/app/fetch/FetchData";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

interface OrderStatus {
  id: number;
  status: string;
}

interface OrderData {
  Status: OrderStatus;
  acount_rep: string;
  adress: string;
  authorId: number;
  contact_person: string;
  custumer: string;
  id: number;
  id_operator: number;
  order_date: string;
  po_number: number;
  product_type: string;
  quotation_number: number;
  required_date: string;
  sales_person: string;
  sales_type: string;
  ship_to: string;
  so_number: number;
}

export default function Page({ params }: { params: { id: string } }) {
  const [orderData, setOrderData] = useState<OrderData | null>(null); // Initialize with null

  const route = useRouter();

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const orderId = params.id;
        if (orderId !== null) {
          const id = parseInt(orderId);
          const task = await getOrder(id);
          setOrderData(task?.data.data[0] as OrderData); // Update the state with response data
        } else {
          console.log("User ID not found in local storage.");
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchTask();
  }, [params.id]); // Include params.id in the dependency array

  if (!orderData) {
    return <div>Loading...</div>; // Show a loading state until data is fetched
  }

  // Destructure orderData for easy access
  const {
    Status,
    acount_rep,
    adress,
    authorId,
    contact_person,
    custumer,
    id,
    id_operator,
    order_date,
    po_number,
    product_type,
    quotation_number,
    required_date,
    sales_person,
    sales_type,
    ship_to,
    so_number,
  } = orderData;

  const handleStart = async () => {
    try {
      const orderId = params.id;
      if (orderId !== null) {
        const id = parseInt(orderId);
        const task = await postStatus(id, 3);
        setOrderData(task?.data.data[0] as OrderData);
      } else {
        console.log("User ID not found in local storage.");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleRredo = async () => {
    try {
      const orderId = params.id;
      if (orderId !== null) {
        const id = parseInt(orderId);
        const task = await postStatus(id, 1);
        setOrderData(task?.data.data[0] as OrderData);
      } else {
        console.log("User ID not found in local storage.");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleFinish = async () => {
    try {
      const orderId = params.id;
      if (orderId !== null) {
        const id = parseInt(orderId);
        await postFinish(id, 1, "finishing");
        route.push("/operator");
      } else {
        console.log("User ID not found in local storage.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-around relative pt-[2rem]">
      <div className="p-[3rem] rounded-md shadow-md bg-white text-text w-[95%] space-y-[1rem] text-[.7rem] mb-[10rem]">
        <table className="min-w-full divide-y divide-gray-200 rounded-md border">
          <thead className="bg-gray-50">
            <tr className="px-6 py-3 text-left text-gray-500 font-medium">
              <th className="px-6 py-3 text-center text-gray-500">Product</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-center">
                {product_type}
              </td>
            </tr>
          </tbody>
        </table>
        <div className="grid grid-cols-2 gap-4">
          <table className="min-w-full divide-y divide-gray-200 rounded-md border">
            <thead className="bg-gray-50">
              <tr className="px-6 py-3 text-left text-gray-500 font-medium">
                <th className="px-6 py-3 text-center text-gray-500">
                  Custumer
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  {custumer}
                </td>
              </tr>
            </tbody>
          </table>
          <table className="min-w-full divide-y divide-gray-200 rounded-md border">
            <thead className="bg-gray-50">
              <tr className="px-6 py-3 text-left text-gray-500 font-medium">
                <th className="px-6 py-3 text-center text-gray-500">
                  Sales Person
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  {sales_person}
                </td>
              </tr>
            </tbody>
          </table>
          <table className="min-w-full divide-y divide-gray-200 rounded-md border">
            <thead className="bg-gray-50">
              <tr className="px-6 py-3 text-left text-gray-500 font-medium">
                <th className="px-6 py-3 text-center text-gray-500">
                  Date Created
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  {order_date}
                </td>
              </tr>
            </tbody>
          </table>
          <table className="min-w-full divide-y divide-gray-200 rounded-md border">
            <thead className="bg-gray-50">
              <tr className="px-6 py-3 text-left text-gray-500 font-medium">
                <th className="px-6 py-3 text-center text-gray-500">
                  Date Required
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  {required_date}
                </td>
              </tr>
            </tbody>
          </table>
          <table className="min-w-full divide-y divide-gray-200 rounded-md border">
            <thead className="bg-gray-50">
              <tr className="px-6 py-3 text-left text-gray-500 font-medium">
                <th className="px-6 py-3 text-center text-gray-500">
                  Order Quantity
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  {Status.status}
                </td>
              </tr>
            </tbody>
          </table>
          <table className="min-w-full divide-y divide-gray-200 rounded-md border">
            <thead className="bg-gray-50">
              <tr className="px-6 py-3 text-left text-gray-500 font-medium">
                <th className="px-6 py-3 text-center text-gray-500">
                  SO Remarks
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  {so_number}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="fixed bottom-0 w-full flex justify-center py-[1rem] z-10 bg-white">
        <div className="w-[95%] flex justify-between space-x-[1rem]">
          <button
            className={`p-[2rem] w-full rounded-md text-center shadow-md ${
              Status.id === 1 ? "bg-red-200" : "bg-gray-100 text-gray-500"
            }`}
            onClick={handleStart}
            disabled={Status.id === 3}
          >
            Start
          </button>
          <button
            className={`p-[2rem] w-full rounded-md text-center shadow-md ${
              Status.id === 3 ? "bg-red-200" : "bg-gray-100 text-gray-500"
            }`}
            onClick={handleRredo}
            disabled={Status.id === 1}
          >
            Redo
          </button>
          <button
            className="bg-red-200 p-[2rem] w-full rounded-md text-center"
            onClick={handleFinish}
          >
            Finish
          </button>
        </div>
      </div>
    </div>
  );
}
