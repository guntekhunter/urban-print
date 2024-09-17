"use client";
import React, { useEffect, useState } from "react";

interface Performance {
  notStarted: number;
  waiting: number;
  onProgress: number;
  finish: number;
  late: number;
}

interface Segment {
  value: number;
  color: string;
  total: number;
  taskCount: number;
}

interface CircularProgressBarProps {
  performance: Performance;
  idPrefix: string;
  index: number;
  operatorTask: number
}

const colorMap: { [key: string]: string } = {
  "green-400": "stroke-green-400",
  "blue-400": "stroke-blue-400",
  "red-400": "stroke-red-400",
};

export default function ChartComponent({
  performance,
  idPrefix,
  index,
  operatorTask,
}: CircularProgressBarProps) {
  const [segments, setSegments] = useState<Segment[]>([]);
  const [performances, setPerformance] = useState<number>();

  useEffect(() => {
    const totalTasks = Object.values(performance).reduce((a, b) => a + b, 0);
    const goodPerformance = performance.finish + performance.onProgress;
    const latePerformance = performance.late;

    // Calculate the performance percentage
    const basePerformance = 100;
    const performanceReductionPerLateTask =
      latePerformance > 0 ? (latePerformance / totalTasks) * 100 : 0;
    const calculatedPerformance =
      basePerformance - performanceReductionPerLateTask;

    const finalPerformance = calculatedPerformance.toFixed(2);
    setPerformance(Number(finalPerformance));
    console.log("ini idnya", operatorTask)

    const segmentData: Segment[] = [
      {
        value: performance.finish,
        color: "green-400",
        total: totalTasks,
        taskCount: performance.finish,
      },
      {
        value: performance.onProgress,
        color: "green-400",
        total: totalTasks,
        taskCount: performance.onProgress,
      },
      {
        value: performance.late,
        color: "red-400",
        total: totalTasks,
        taskCount: performance.late,
      },
    ];
    setSegments(segmentData);
  }, [performance]);

  return (
    <div className="space-y-[1rem] w-full">
      <div className="relative flex justify-center items-center">
        <svg className="w-64 h-64 transform -rotate-90" viewBox="0 0 36 36">
          <circle cx="18" cy="18" r="15.9155" fill="white" />
          <path
            className="stroke-gray-200 stroke-2 fill-none"
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
          />
          {segments.map((segment, index) => {
            const percentage = (segment.value / segment.total) * 100;
            const dashArray = `${percentage} ${100 - percentage}`;
            return (
              <circle
                key={index}
                id={`${idPrefix}-segment${index + 1}`}
                className={`fill-none ${colorMap[segment.color]} stroke-2`}
                cx="18"
                cy="18"
                r="15.9155"
                strokeDasharray={dashArray}
                strokeDashoffset={
                  index === 0
                    ? 0
                    : segments
                      .slice(0, index)
                      .reduce(
                        (acc, seg) => acc - (seg.value / seg.total) * 100,
                        0
                      )
                }
              />
            );
          })}
        </svg>
        <div className="absolute inset-0 flex items-center justify-center text-2xl font-bold text-gray-700">
          <div className="text-center">
            <p className="border-b-[2px] border-gray-700">
              {
                operatorTask ? (
                  <>
                    {performances} % On Time
                  </>
                ) : (
                  <>
                    -
                  </>
                )
              }
            </p>
            <p>
              {operatorTask} / Pekerjaan
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
