"use client";
import {
  createSale,
  getOrder,
  postFinish,
  postStatus,
} from "@/app/fetch/FetchData";
import { dateFormater } from "@/app/functions/DateFormater";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

interface OrderStatus {
  id: number;
  status: string;
}

interface Customer {
  id: number;
  name: string;
}

interface OrderData {
  Status: OrderStatus;
  Customer: Customer;
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
  quantity: string;
  sales_type: string;
  ship_to: string;
  late: boolean;
  so_number: number;
  type: string;
  status: number;
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
    quantity,
    status,
    late,
    type,
    so_number,
  } = orderData;

  const handleStart = async () => {
    const userId = localStorage.getItem("user_id");
    let idOperator = 0;
    if (userId) {
      idOperator = parseInt(userId);
    } else {
      console.log("error");
    }
    const currentDate = new Date().toISOString();
    const requiredDateObject = new Date(required_date);
    console.log(requiredDateObject);
    try {
      const orderId = params.id;
      if (orderId !== null) {
        if (new Date(currentDate) > requiredDateObject) {
          console.log("terlambat");
          const id = parseInt(orderId);
          const task = await postStatus(id, 3, idOperator, true);
          setOrderData(task?.data.data[0] as OrderData);
        } else {
          const id = parseInt(orderId);
          const task = await postStatus(id, 3, idOperator, false);
          setOrderData(task?.data.data[0] as OrderData);
        }
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
        const task = await postStatus(id, 1, 0, late);
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
        const currentDate = new Date().toISOString();
        const data = {
          order_id: id,
          status: "unpaid",
          date: currentDate,
          sales_id: authorId,
        };
        await createSale(data);

        if (product_type === "printing potography") {
          await postFinish(id, 2, "finishing photography");
        } else if (product_type === "printing stickers") {
          await postFinish(id, 2, "finishing stickers");
        } else if (product_type === "printing poster") {
          await postFinish(id, 2, "finishing poster");
        } else {
          await postFinish(id, 4, product_type);
        }
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
                {type}
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
                  {dateFormater(order_date)}
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
                  {dateFormater(required_date)}
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
                  {quantity}
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
              orderData.status === 1 || orderData.status === 2
                ? "bg-red-200"
                : "bg-gray-100 text-gray-500"
            }`}
            onClick={handleStart}
            disabled={orderData.status === 3}
          >
            Start
          </button>
          <button
            className={`p-[2rem] w-full rounded-md text-center shadow-md ${
              orderData.status === 3
                ? "bg-red-200"
                : "bg-gray-100 text-gray-500"
            }`}
            onClick={handleRredo}
            disabled={orderData.status === 1}
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
