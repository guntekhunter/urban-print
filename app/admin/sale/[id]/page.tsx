"use client";
import React, { useEffect, useState } from "react";
import { editSale, getSale } from "@/app/fetch/FetchData";
import Button from "@/app/component/template/Button";
import { useRouter } from "next/navigation";

interface Order {
  so_number: number;
  product_type: string;
  prize: number;
}
interface Sale {
  order_id: number;
  status: string;
  date: string;
  order: Order;
}

export default function page({ params }: { params: { id: string } }) {
  const [sale, setSale] = useState<Sale | null>(null);

  const route = useRouter();

  useEffect(() => {
    const orderId = params.id;
    const fetchSale = async () => {
      try {
        if (orderId) {
          const res = await getSale(orderId);
          setSale(res?.data.data[0] as Sale);
          console.log(res);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchSale();
  }, [params.id]);

  console.log(sale);

  if (!sale) {
    return <div>Loading ...</div>;
  }

  const { order, status } = sale;

  const handlePaid = async () => {
    if (status === "unpaid") {
      try {
        const id = params.id;
        const data = {
          id: parseInt(id),
          status: "paid",
        };
        await editSale(data);
        route.push("/admin/sale");
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("its already been paid");
    }
  };
  const handleRefund = async () => {
    try {
      const id = params.id;
      const data = {
        id: parseInt(id),
        status: "refund",
      };
      await editSale(data);
      route.push("/admin/sale");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex justify-around relative pt-[2rem]">
      <div className="p-[3rem] rounded-md shadow-md bg-white text-text w-[95%] space-y-[1rem] text-[.7rem]">
        <Button onClick={() => route.push("/admin/sale")} className="ml-[1rem]">
          Back
        </Button>
        <h1 className="text-[2rem] font-bold px-[1rem]">Sale Detail</h1>
        <table className="">
          <tbody className="text-[1rem]">
            <tr className="">
              <td className="px-4 py-2 ">Order So Number</td>
              <td>:</td>
              <td className="px-4 py-2">{order.so_number}</td>
            </tr>
            <tr>
              <td className="px-4 py-2 ">Product Type</td>
              <td>:</td>
              <td className="px-4 py-2">
                {order.product_type.replace("finishing ", "")}
              </td>
            </tr>
            <tr>
              <td className="px-4 py-2 ">Prize</td>
              <td>:</td>
              <td className="px-4 py-2">
                {new Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "IDR",
                }).format(order.prize)}
              </td>
            </tr>
            <tr>
              <td className="px-4 py-2 ">Status</td>
              <td>:</td>
              <td className="px-4 py-2">{status}</td>
            </tr>
          </tbody>
        </table>
        <div className="px-[1rem] flex space-x-[1rem]">
          <Button
            onClick={handlePaid}
            className="w-[5rem] bg-green-300 hover:bg-green-400 hover:text-white border border-[1.5px] border-green-400 text-green-500 "
          >
            Pay
          </Button>
          <Button
            onClick={handleRefund}
            className="w-[5rem] bg-red-500 hover:bg-red-400 hover:text-white border border-[1.5px] border-red-400 text-red-500 "
          >
            Refund
          </Button>
        </div>
      </div>
    </div>
  );
}
