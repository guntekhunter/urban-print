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
        if (dayData) {
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
          dayData.total += theTotal;
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

        <table className="min-w-full divide-y divide-gray-200 rounded-md">
          <thead className="bg-gray-50">
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
              <th className="px-6 py-3 text-left text-gray-500 text-[1rem] text-sm font-medium">
                Ket.
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {mountlyData.map((item: any, key: any) => (
              <tr className="cursor-pointer" key={key}>
                <td className="px-6 py-4 whitespace-nowrap">{key + 1}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.date}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {item.transaction}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{item.paid}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.unpaid}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.refund}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.total}</td>
                <td className="px-6 py-4 whitespace-nowrap"></td>
              </tr>
            ))}
          </tbody>
        </table>
        <div ref={ref} className={`p-[5rem] text-[.7rem] hidden print:block`}>
          <table className="min-w-full divide-y divide-gray-200 rounded-md">
            <thead className="bg-gray-50">
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
                <th className="px-6 py-3 text-left text-gray-500 text-[1rem] text-sm font-medium">
                  Ket.
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {mountlyData.map((item: any, key: any) => (
                <tr className="cursor-pointer" key={key}>
                  <td className="px-6 py-4 whitespace-nowrap">{key + 1}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {item.transaction}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.paid}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.unpaid}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.refund}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.total}</td>
                  <td className="px-6 py-4 whitespace-nowrap"></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
