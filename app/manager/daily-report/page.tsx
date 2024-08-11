"use client";
import Button from "@/app/component/template/Button";
import Dropdown from "@/app/component/template/Dropdown";
import TimeInputs from "@/app/component/template/TimeInputs";
import {
  getDaily,
  getSales,
  getSalesPerson,
  getUser,
} from "@/app/fetch/FetchData";
import { dateFormat, dateFormater } from "@/app/functions/DateFormater";
import React, { useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";

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
  const ref = useRef<HTMLDivElement>(null);

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

  const handleDropdownChange = async (event: any) => {
    console.log("ini valuenya", event.target.value);
    const intId = parseInt(event.target.value);
    salesPerson.map((item: any) => {
      if (item.id === intId) {
        setSales(item);
      }
    });
  };

  const handleDate = async (date: string, name: string) => {
    setTheDate(date);
  };

  const handleSave = async () => {
    console.log("ini the date", theDate);
    if (theDate && sales) {
      const data = {
        sales_id: sales.id,
      };
      try {
        const res = await getDaily(data);
        console.log(res?.data.data);
        const theData = res?.data.data;

        let total = 0;
        let totalPaid = 0;
        let totalRefund = 0;

        const filteredData = theData.filter((item: any) => {
          const itemDate = new Date(item.date).toISOString().split("T")[0];
          const filterDate = new Date(theDate).toISOString().split("T")[0];
          console.log(filterDate, itemDate);
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
    }
  };

  const handlePrint = useReactToPrint({
    content: () => ref.current,
  });
  return (
    <div className="flex flex-col items-center pt-[2rem]">
      <div className="p-8 rounded-md shadow-md bg-white text-black w-[95%] text-[1rem] text-gray-700 border border-gray-300 space-y-[2rem]">
        <div className="grid grid-cols-2 w-[80%] gap-4">
          <div>
            <label htmlFor="">Pilih Sales</label>
            <Dropdown options={salesPerson} onChange={handleDropdownChange} />
          </div>
          <div>
            <label htmlFor="">Pilih Tanggal</label>
            <TimeInputs onChange={handleDate} name="required_date" />
          </div>
          <Button onClick={handleSave}>Filter</Button>
          <Button onClick={handlePrint}>Print</Button>
        </div>
        <div className="py-[5rem] px-[10rem] bg-gray-200">
          <div className="p-[4rem] bg-white" ref={ref}>
            <div className="text-center ">
              <div className="flex justify-between items-center">
                <h1 className="font-bold">URBAN PRINT</h1>
                <div className="w-2/3">
                  <h1 className="font-bold text-[1.8rem]">
                    Laporan Hasil Kasir
                  </h1>
                  <p className="text-gray-700">Date: {dateFormat(theDate)}</p>
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

            <div className="mt-8 space-y-[5rem]">
              <p className="text-sm text-gray-600">{sales?.name}</p>
              <p className="text-sm text-gray-600">
                {dateFormat(theDate)}: __________________
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
