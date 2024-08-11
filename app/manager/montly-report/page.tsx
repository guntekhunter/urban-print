"use client";
import Button from "@/app/component/template/Button";
import MountInput from "@/app/component/template/MountInput";
import { getMountly } from "@/app/fetch/FetchData";
import React, { useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";

export default function page() {
  const [mountlyData, setMoutlyData] = useState<any>([]);
  const [mounth, setMounth] = useState("");
  const [clicked, setClicked] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const handleDate = async (date: string, name: string) => {
    setMounth(date);
    const [inputYear, inputMonth] = date.split("-");
    const res = await getMountly();
    const theData = res?.data.data;

    if (Array.isArray(theData)) {
      // Get the number of days in the selected month
      const daysInMonth = new Date(
        parseInt(inputYear),
        parseInt(inputMonth),
        0
      ).getDate();

      // Initialize an array to hold the data for each day
      const dailyData = Array.from({ length: daysInMonth }, (_, index) => {
        const dateStr = `${inputYear}-${inputMonth.padStart(2, "0")}-${String(
          index + 1
        ).padStart(2, "0")}`;
        return {
          date: dateStr,
          paid: 0,
          unpaid: 0,
          refund: 0,
          transaction: 0,
          total: 0,
        };
      });

      // Iterate through the data and aggregate the values
      theData.forEach((item: any) => {
        const itemDate = new Date(item.date);
        const itemYear = String(itemDate.getFullYear());
        const itemMonth = String(itemDate.getMonth() + 1).padStart(2, "0");
        const itemDay = String(itemDate.getDate()).padStart(2, "0");

        const dateStr = `${itemYear}-${itemMonth}-${itemDay}`;

        // Find the corresponding day in the dailyData array
        const dayData = dailyData.find((d) => d.date === dateStr);
        if (dayData && item.order.prize) {
          const prize = item.order.prize;

          if (item.status === "paid") {
            dayData.paid += prize;
          } else if (item.status === "unpaid") {
            dayData.unpaid += prize;
          } else if (item.status === "refund") {
            dayData.refund += prize;
          }

          dayData.transaction += prize;
          const theTotal =
            dayData.transaction - dayData.unpaid - dayData.refund;
          dayData.total = theTotal;

          if (dayData.paid > 0 || dayData.unpaid > 0 || dayData.refund > 0) {
            // Check if the date already exists in the dailyData array
            const existingDataIndex = dailyData.findIndex(
              (d) => d.date === dateStr
            );
            if (existingDataIndex === -1) {
              dailyData.push(dayData);
            } else {
              dailyData[existingDataIndex] = dayData;
            }
          }
        }
      });

      console.log("Daily data:", dailyData);
      setMoutlyData(dailyData);
    } else {
      console.error("Expected an array, but got:", res?.data);
    }
    console.log(date);
  };

  const handlePrint = useReactToPrint({
    content: () => ref.current,
  });

  const getPageMargins = () => {
    return `@page { margin: 4rem 4rem 3rem 3rem !important; }`;
  };

  return (
    <div className="flex flex-col items-center pt-[2rem]">
      <div className="p-8 rounded-md shadow-md bg-white text-black w-[95%] text-[1rem] text-gray-700 border border-gray-300 space-y-[2rem]">
        <MountInput onChange={handleDate} />
        <Button
          onClick={() => {
            setClicked(true);
            handlePrint();
          }}
        >
          Print
        </Button>
        <div className="bg-[#F8F8F8] p-[2rem] h-[100vh] overflow-y-scroll">
          <table className="min-w-full divide-y divide-gray-200 rounded-md">
            <thead className="bg-green-200">
              <tr className="px-6 py-3 text-left text-gray-500 text-[1rem] text-sm font-medium">
                <th className="px-6 py-3 text-left text-gray-500 text-[1rem] text-sm font-medium">
                  No
                </th>
                <th className="px-6 py-3 text-left text-gray-500 text-[1rem] text-sm font-medium">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-gray-500 text-[1rem] text-sm font-medium">
                  Penjualan
                </th>
                <th className="px-6 py-3 text-left text-gray-500 text-[1rem] text-sm font-medium">
                  Pelunasan
                </th>
                <th className="px-6 py-3 text-left text-gray-500 text-[1rem] text-sm font-medium">
                  Belum Dibayar
                </th>
                <th className="px-6 py-3 text-left text-gray-500 text-[1rem] text-sm font-medium">
                  Refund
                </th>
                <th className="px-6 py-3 text-left text-gray-500 text-[1rem] text-sm font-medium">
                  Total Omset
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {mountlyData.map((item: any, key: any) => (
                <tr className="cursor-pointer" key={key}>
                  <td className="px-6 py-4 whitespace-nowrap">{key + 1}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {item.transaction === 0
                      ? "-"
                      : new Intl.NumberFormat("id-ID", {
                          style: "currency",
                          currency: "IDR",
                        }).format(item.transaction)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {item.paid === 0
                      ? "-"
                      : new Intl.NumberFormat("id-ID", {
                          style: "currency",
                          currency: "IDR",
                        }).format(item.paid)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {item.unpaid === 0
                      ? "-"
                      : new Intl.NumberFormat("id-ID", {
                          style: "currency",
                          currency: "IDR",
                        }).format(item.unpaid)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {item.refund === 0
                      ? "-"
                      : new Intl.NumberFormat("id-ID", {
                          style: "currency",
                          currency: "IDR",
                        }).format(item.refund)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {item.total === 0
                      ? "-"
                      : new Intl.NumberFormat("id-ID", {
                          style: "currency",
                          currency: "IDR",
                        }).format(item.total)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* printable component */}
        <div
          ref={ref}
          className={`text-[.7rem] hidden print:block space-y-[2rem]`}
        >
          <style>{getPageMargins()}</style>
          <div className="flex justify-center">
            <h1 className="text-[1rem] font-bold">LAPORAN BULANAN</h1>
          </div>
          <table className="min-w-full divide-y divide-gray-200 rounded-md">
            <thead className="bg-green-200 text-[.7rem]">
              <tr className="px-6 py-3 text-left text-gray-500">
                <th className="px-6 py-3 text-left text-gray-500">No</th>
                <th className="px-6 py-3 text-left text-gray-500">Date</th>
                <th className="px-6 py-3 text-left text-gray-500">Penjualan</th>
                <th className="px-6 py-3 text-left text-gray-500">Pelunasan</th>
                <th className="px-6 py-3 text-left text-gray-500">
                  Belum Dibayar
                </th>
                <th className="px-6 py-3 text-left text-gray-500">Refund</th>
                <th className="px-6 py-3 text-left text-gray-500">
                  Total Omset
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {mountlyData.map((item: any, key: any) => (
                <tr className="cursor-pointer" key={key}>
                  <td className="px-6 py-4 whitespace-nowrap">{key + 1}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {item.transaction === 0
                      ? "-"
                      : new Intl.NumberFormat("id-ID", {
                          style: "currency",
                          currency: "IDR",
                        }).format(item.transaction)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {item.paid === 0
                      ? "-"
                      : new Intl.NumberFormat("id-ID", {
                          style: "currency",
                          currency: "IDR",
                        }).format(item.paid)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {item.unpaid === 0
                      ? "-"
                      : new Intl.NumberFormat("id-ID", {
                          style: "currency",
                          currency: "IDR",
                        }).format(item.unpaid)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {item.refund === 0
                      ? "-"
                      : new Intl.NumberFormat("id-ID", {
                          style: "currency",
                          currency: "IDR",
                        }).format(item.refund)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {item.total === 0
                      ? "-"
                      : new Intl.NumberFormat("id-ID", {
                          style: "currency",
                          currency: "IDR",
                        }).format(item.total)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
