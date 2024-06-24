"use client";
import React, { useLayoutEffect } from "react";

interface Segment {
  value: number;
  color: string;
}

interface CircularProgressBarProps {
  segments: Segment[];
  idPrefix: string;
}

export default function Diagram({
  segments,
  idPrefix,
}: CircularProgressBarProps) {
  useLayoutEffect(() => {
    const radius = 15.9155;
    const circumference = 2 * Math.PI * radius;

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
    });
  }, [segments, idPrefix]);

  return (
    <div className="relative">
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
            className={`fill-none stroke-${segment.color} stroke-2`}
            cx="18"
            cy="18"
            r="15.9155"
            strokeDasharray="0 100"
            strokeDashoffset="0"
          />
        ))}
      </svg>
      <div className="absolute inset-0 flex items-center justify-center text-2xl font-bold text-gray-700">
        100%
      </div>
    </div>
  );
}
