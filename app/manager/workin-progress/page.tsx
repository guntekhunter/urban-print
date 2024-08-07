"use client";
import ButtonPerformance from "@/app/component/manager/ButtonPerformance";
import Dropdown from "@/app/component/template/Dropdown";
import WorkInProgress from "@/app/component/template/WorkInProgress";
import {
  getAllOrder,
  getOperator,
  getOperatorOnProgress,
} from "@/app/fetch/FetchData";
import Image from "next/image";
import React, { useEffect, useState } from "react";

// Define the type for the segment
type Segment = {
  value: number;
  color: string;
  total: number;
  taskCount: number;
};

export default function Page() {
  const [operators, setOperators] = useState<any>([]);
  const [work, setWork] = useState<Segment[]>([]);
  const [orders, setOrders] = useState([]);

  const handleDropdownChange = async (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    console.log(event.target.value);
    const res = await getOperatorOnProgress(event.target.value);
    console.log(res?.data.response);
    const data = res?.data.response;
    console.log(data);
    const total =
      data.notStarted + data.waiting + data.onProgress + data.finish;
    if (total === 0) {
      setWork([{ value: 100, color: "gray-400", total: total, taskCount: 0 }]);
      return;
    }

    const segments: Segment[] = [];
    if (data.notStarted > 0) {
      segments.push({
        value: (data.notStarted / total) * 100,
        color: "red-400",
        total: total,
        taskCount: data.notStarted,
      });
    }
    if (data.waiting > 0) {
      segments.push({
        value: (data.waiting / total) * 100,
        color: "yellow-400",
        total: total,
        taskCount: data.waiting,
      });
    }
    if (data.onProgress > 0) {
      segments.push({
        value: (data.onProgress / total) * 100,
        color: "blue-400",
        total: total,
        taskCount: data.onProgress,
      });
    }
    if (data.finish > 0) {
      segments.push({
        value: (data.finish / total) * 100,
        color: "green-400",
        total: total,
        taskCount: data.finish,
      });
    }

    setWork(segments);
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
        <div className="flex justify-center items-center">
          <div className="w-[20rem]">
            <WorkInProgress segments={work} idPrefix={`diagram-${1}`} />
          </div>
        </div>
      </div>
    </div>
  );
}
