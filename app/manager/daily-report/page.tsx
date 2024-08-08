"use client";
import Dropdown from "@/app/component/template/Dropdown";
import { getSales, getSalesPerson, getUser } from "@/app/fetch/FetchData";
import React, { useEffect, useState } from "react";

interface Sales {
  id: number;
  name: string;
}

export default function page() {
  const [theDate, setTheDate] = useState(""); // This will store the date to filter by
  const [orderData, setOrderData] = useState([]);
  const [totalSale, setTotalSale] = useState(0);
  const [totalPaid, setTotalPaid] = useState(0);
  const [totalRefund, setTotalRefund] = useState(0);
  const [salesPerson, setSalesPerson] = useState([]);
  const [sales, setSales] = useState<Sales | null>(null);
  useEffect(() => {
    const currentDate = new Date().toISOString().split("T")[0];
    setTheDate(currentDate);
  }, []);

  useEffect(() => {
    const fetchSales = async () => {
      const res = await getSalesPerson();
      console.log(res);
      setSalesPerson(res?.data.data);
    };
    fetchSales();
  }, []);

  console.log(salesPerson);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await getSales();
        console.log(res?.data.data);
        const theData = res?.data.data;

        let total = 0;
        let totalPaid = 0;
        let totalRefund = 0;

        const filteredData = theData.filter((item: any) => {
          const itemDate = new Date(item.date).toISOString().split("T")[0];
          const filterDate = new Date(theDate).toISOString().split("T")[0];
          if (itemDate === filterDate) {
            total += item.order.prize;
            if (item.status === "paid") {
              totalPaid += item.order.prize;
            } else if (item.status === "refund") {
              totalRefund += item.order.prize;
            }
          }
          return itemDate === filterDate;
        });

        setTotalSale(total);
        setTotalPaid(totalPaid);
        setTotalRefund(totalRefund);
        setOrderData(filteredData);
      } catch (error) {
        console.log(error);
      }
    };
    if (theDate) fetchOrders();
  }, [theDate]);

  const handleDropdownChange = async (event: any) => {
    console.log("ini valuenya", event.target.value);
    const intId = parseInt(event.target.value);
    salesPerson.map((item: any) => {
      if (item.id === intId) {
        setSales(item);
      }
    });
  };

  console.log(sales);
  return (
    <div className="flex flex-col items-center pt-[2rem]">
      <div className="p-8 rounded-md shadow-md bg-white text-black w-[95%] text-[1rem] text-gray-700 border border-gray-300 space-y-[2rem]">
        <div className="grid grid-cols-2">
          <div>
            <label htmlFor="">Pilih Sales</label>
            <Dropdown options={salesPerson} onChange={handleDropdownChange} />
          </div>
        </div>
        <div className="py-[5rem] px-[15rem] bg-gray-200">
          <div className="p-[4rem] bg-white">
            <div className="text-center ">
              <div className="flex justify-between items-center">
                <h1 className="font-bold">URBAN PRINT</h1>
                <div className="w-2/3">
                  <h1 className="font-bold text-[1.8rem]">
                    Laporan Hasil Kasir
                  </h1>
                  <p className="text-gray-700">Date: {theDate}</p>
                  <p className="text-gray-700">Nama Sales: {sales?.name}</p>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <table className="w-full text-left border-collapse">
                <tbody>
                  <tr className="border-b">
                    <td className="py-2 font-bold">Total Penjualan</td>
                    <td>:</td>
                    <td className="py-2 text-right">
                      {new Intl.NumberFormat("id-ID", {
                        style: "currency",
                        currency: "IDR",
                      }).format(totalSale)}
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 font-bold">Total Pelunasan</td>
                    <td>:</td>
                    <td className="py-2 text-right">
                      {new Intl.NumberFormat("id-ID", {
                        style: "currency",
                        currency: "IDR",
                      }).format(totalPaid)}
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 font-bold">Total Refund</td>
                    <td>:</td>
                    <td className="py-2 text-right">
                      {new Intl.NumberFormat("id-ID", {
                        style: "currency",
                        currency: "IDR",
                      }).format(totalRefund)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="text-center mt-8">
              <p className="text-sm text-gray-600">Prepared by: John Doe</p>
              <p className="text-sm text-gray-600">
                Signature: __________________
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
