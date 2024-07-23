"use client";
import React, { useEffect, useState } from "react";
import { getTask, getTaskCount } from "../fetch/FetchData";
import Diagram from "../component/template/Diagram";
import { useRouter } from "next/navigation";

export default function Page() {
  const [orderData, setOrderData] = useState({
    printing_stickers: {},
    printing_poster: {},
    printing_photography: {},
  });

  const route = useRouter();

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const userId = localStorage.getItem("user_id");
        if (userId !== null) {
          const id = parseInt(userId);
          const task = await getTask();
          console.log(task?.data);
          setOrderData(task?.data); // Update the state with response data
        } else {
          console.log("User ID not found in local storage.");
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchTask();
  }, []);

  const createSegments = (task: any) => {
    const total = task.notStarted + task.waiting + task.onProgress;
    if (total === 0) {
      return [{ value: 100, color: "gray-400", total: total, taskCount: 0 }]; // Default segment when there's no task
    }

    const segments = [];
    if (task.notStarted > 0) {
      segments.push({
        value: (task.notStarted / total) * 100,
        color: "red-400",
        total: total,
        taskCount: task.notStarted,
      });
    }
    if (task.waiting > 0) {
      segments.push({
        value: (task.waiting / total) * 100,
        color: "yellow-400",
        total: total,
        taskCount: task.waiting,
      });
    }
    if (task.onProgress > 0) {
      segments.push({
        value: (task.onProgress / total) * 100,
        color: "green-400",
        total: total,
        taskCount: task.onProgress,
      });
    }

    return segments;
  };

  const handleChangePage = (index: number) => {
    if (index === 0) {
      route.push("/operator/printing-stickers");
      // make it go to path printing stickers
    } else if (index === 1) {
      route.push("/operator/printing-poster");
      // make it go to path printing photograph
    } else {
      route.push("/operator/printing-photography");
    }
    // add one more path to printing poster
  };

  return (
    <div className="flex justify-around relative pt-[2rem]">
      <div className="p-[3rem] rounded-md shadow-md bg-white text-text w-[95%] text-[.7rem] flex space-x-[4rem]">
        {Object.entries(orderData).map(([key, task], index) => {
          const segments = createSegments(task);
          return (
            <div
              key={index}
              className="flex cursor-pointer justify-center"
              onClick={() => handleChangePage(index)}
            >
              <div className="">
                <Diagram
                  segments={segments}
                  idPrefix={`diagram-${key}`}
                  index={index}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
