"use client";
import ButtonPerformance from "@/app/component/manager/ButtonPerformance";
import ChartComponent from "@/app/component/manager/ChartComponent";
import Dropdown from "@/app/component/template/Dropdown";
import {
  getAllOrder,
  getOperator,
  getPerformance,
} from "@/app/fetch/FetchData";
import Image from "next/image";
import React, { useEffect, useState } from "react";

interface Performance {
  notStarted: number;
  waiting: number;
  onProgress: number;
  finish: number;
  late: number;
}

export default function Page() {
  const [orders, setOrders] = useState([]);
  const [operatorTask, setOperatorTask] = useState<number>()
  const [operators, setOperators] = useState([]);
  const [performance, setPerformance] = useState<Performance | null>(null);

  const handleDropdownChange = async (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    try {
      console.log("id operator", event.target.value)
      const res = await getPerformance(event.target.value);
      setOperatorTask(parseInt(res?.data.count))
      setPerformance(res?.data.performance);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await getAllOrder();
        setOrders(res?.data.data);
        const operator = await getOperator();
        setOperators(operator?.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchOrder();
  }, []);
  console.log(performance);

  return (
    <div className="flex justify-around relative pt-[2rem]">
      <div className="p-[3rem] rounded-md shadow-md bg-white text-text w-[95%] space-y-[1rem] text-[.7rem]">
        <ButtonPerformance />
        <h1 className="text-[2rem] font-bold">Data Order</h1>
        <div className="w-full flex items-center">
          <label htmlFor="" className="w-[7rem] align-center">
            Operator
          </label>
          <Dropdown options={operators} onChange={handleDropdownChange} />
        </div>
        {performance && (
          <div className="mt-[2rem]">
            <h2 className="text-[1.5rem] font-bold">Performance</h2>
            <div>
              <ChartComponent
                performance={performance}
                idPrefix={`diagram-${1}`}
                index={1}
                operatorTask={operatorTask ?? 0}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
