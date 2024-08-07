"use client";
import { getAllOrder } from "@/app/fetch/FetchData";
import React, { useEffect } from "react";

export default function page() {
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await getAllOrder();
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    };
    fetchOrders();
  }, []);
  return (
    <div className="flex justify-around relative pt-[2rem]">
      <div className="p-[3rem] rounded-md shadow-md bg-white text-black w-[95%] text-[.7rem] flex space-x-[3rem] text-[1rem] text-gray-700 flex">
        <div className="w-full bg-red-200 p-[1.5rem]">
          <div className="flex justify-between w-full px-[5rem]">
            <div>Ini logo</div>
            <div className="text-center">
              <h1 className="font-bold text-[1.5rem] text-center">
                Laporan Hasil Kasir
              </h1>
              <p className="text-center">Date: </p>
              <p className="text-center">Nama Sales</p>
            </div>
          </div>
          <div>
            <table className="min-w-full">
              <tbody>
                <tr className="">
                  <td className="px-4 py-2 font-bold">Total Penjualan</td>
                  <td>:</td>
                  <td className="px-4 py-2">asdasd</td>
                </tr>
                <tr className="">
                  <td className="px-4 py-2 font-bold">Total A/R:</td>
                  <td>:</td>
                  <td className="px-4 py-2">lkasd</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-bold">Total Pelunasan</td>
                  <td>:</td>
                  <td className="px-4 py-2">asd</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-bold">
                    Total Pembayaran Lebih
                  </td>
                  <td>:</td>
                  <td className="px-4 py-2">asd</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-bold">Total Refound</td>
                  <td>:</td>
                  <td className="px-4 py-2">asd</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-bold">Total Voucher</td>
                  <td>:</td>
                  <td className="px-4 py-2">asd</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
