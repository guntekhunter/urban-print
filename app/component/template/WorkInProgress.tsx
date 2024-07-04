"use client";
import React, { useLayoutEffect, useState } from "react";

interface Segment {
  value: number;
  color: string;
  total: any;
  taskCount: number; // Add taskCount property
}

interface CircularProgressBarProps {
  segments: Segment[];
  idPrefix: string;
  index: number;
}

const colorMap: { [key: string]: string } = {
  "green-400": "stroke-green-400",
  "red-400": "stroke-red-400",
  "yellow-400": "stroke-yellow-400",
  "blue-400": "stroke-blue-400",
  // Add more color mappings as needed
};

export default function WorkInProgress({
  segments,
  idPrefix,
  index,
}: CircularProgressBarProps) {
  const [totalTask, setTotalTask] = useState<number>(0);
  const [notStartedTotal, setNotStartedTotal] = useState<number>(0);
  const [waitingTotal, setWaitingTotal] = useState<number>(0);
  const [onProgressTotal, setOnProgressTotal] = useState<number>(0);
  const [onFinishTotal, setOnFinishTotal] = useState<number>(0);

  useLayoutEffect(() => {
    const totalValue = segments.length > 0 ? segments[0].total : 0;
    setTotalTask(totalValue);
    const radius = 15.9155;
    const circumference = 2 * Math.PI * radius;

    let notStarted = 0;
    let waiting = 0;
    let onProgress = 0;
    let finish = 0;

    segments.forEach((segment, index) => {
      const circle = document.getElementById(
        `${idPrefix}-segment${index + 1}`
      ) as HTMLElement;
      if (circle) {
        const dashArray = (segment.value / 100) * circumference;
        const prevSegmentsOffset = segments
          .slice(0, index)
          .reduce((acc, curr) => acc + curr.value, 0);
        const dashOffset = (prevSegmentsOffset / 100) * circumference;

        circle.style.strokeDasharray = `${dashArray} ${circumference}`;
        circle.style.strokeDashoffset = `-${dashOffset}`;
      }

      // Update totals based on segment color or other criteria
      if (segment.color === "yellow-400") waiting += segment.taskCount;
      if (segment.color === "red-400") notStarted += segment.taskCount;
      if (segment.color === "blue-400") onProgress += segment.taskCount;
      if (segment.color === "green-400") finish += segment.taskCount;
    });

    setNotStartedTotal(notStarted);
    setWaitingTotal(waiting);
    setOnProgressTotal(onProgress);
    setOnFinishTotal(finish);
  }, [segments, idPrefix]);

  return (
    <div className="space-y-[1rem] w-full">
      <div className="relative flex justify-center items-center">
        <svg className="w-64 h-64 transform -rotate-90" viewBox="0 0 36 36">
          <circle cx="18" cy="18" r="15.9155" fill="white" />
          <path
            className="stroke-gray-200 stroke-2 fill-none"
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
          />
          {segments.map((segment, index) => (
            <circle
              key={index}
              id={`${idPrefix}-segment${index + 1}`}
              className={`fill-none ${colorMap[segment.color]} stroke-2`}
              cx="18"
              cy="18"
              r="15.9155"
              strokeDasharray="0 100"
              strokeDashoffset="0"
            />
          ))}
        </svg>
        <div className="absolute inset-0 flex items-center justify-center text-2xl font-bold text-gray-700">
          {totalTask}
        </div>
      </div>
      <div className="w-full">
        <table className="w-full">
          <thead>
            <tr className="text-center flex">
              <th className="flex-1">{waitingTotal}</th>
              <th className="flex-1">{notStartedTotal}</th>
              <th className="flex-1">{onProgressTotal}</th>
              <th className="flex-1">{onFinishTotal}</th>
            </tr>
          </thead>
          <tbody>
            <tr className="text-center h-[.2rem] flex">
              <td className="bg-yellow-400 flex-1"></td>
              <td className="bg-red-400 flex-1"></td>
              <td className="bg-blue-400 flex-1"></td>
              <td className="bg-green-400 flex-1"></td>
            </tr>
            <tr className="text-center flex">
              <td className="flex-1">Waiting</td>
              <td className="flex-1">Not Started</td>
              <td className="flex-1">On Progress</td>
              <td className="flex-1">Finish</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
