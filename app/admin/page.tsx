"use client";
import React, { useEffect, useState } from "react";
import Button from "../component/template/Button";
import { deleteOrder, getAllOrder, getCustumer, getOperators } from "../fetch/FetchData";
import { dateFormater } from "../functions/DateFormater";
import Image from "next/image";
import { useRouter } from "next/navigation";

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
  const [operators, setOperators] = useState<OperatorsMap>({});  // Store operator data by ID
  const [custumer, setCustumer] = useState<CustumerMap>({});  // Store operator data by ID

  const route = useRouter();

  const handleDelete = async (id: any) => {
    try {
      const res = await deleteOrder(id);
      setOrders(res?.data.response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await getAllOrder();
        setOrders(res?.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchOrder();
  }, []);

  useEffect(() => {
    const fetchOperators = async () => {
      const operatorPromises = orders.map(async (item) => {
        if (item.id_operator) {
          const res = await getOperators(item.id_operator);
          return { id: item.id_operator, name: res?.data?.data?.name || "" };
        }
        return null;
      });

      const results = await Promise.all(operatorPromises);
      const operatorMap: OperatorsMap = {};
      results.forEach((operator) => {
        if (operator) {
          operatorMap[operator.id] = operator.name;
        }
      });
      setOperators(operatorMap);
    };

    if (orders.length > 0) {
      fetchOperators(); // Fetch operators after orders are loaded
    }
  }, [orders]);

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

    if (orders.length > 0) {
      fetchCustumer(); // Fetch operators after orders are loaded
    }
  }, [orders]);

  return (
    <div className="flex justify-around relative pt-[2rem]">
      <div className="p-[3rem] rounded-md shadow-md bg-white text-text w-[95%] space-y-[1rem] text-[.7rem]">
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
                Required Date
              </th>
              <th className="px-6 py-3 text-left text-gray-500 text-[1rem] text-sm font-medium">
                Status
              </th>
              <th className="px-6 py-3 text-left text-gray-500 text-[1rem] text-sm font-medium">
                Operator
              </th>
              <th className="px-6 py-3 text-left text-gray-500 text-[1rem] text-sm font-medium">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {orders?.map((item: any, key) => (
              <tr key={key} className="cursor-pointer">
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
                  {item.Status.status === "waiting" ? "not started" : item.Status.status}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {item.id_operator ? operators[item.id_operator] || "Unknown" : "No Operator"}
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
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div >
  );
}
