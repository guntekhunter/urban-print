"use client";
import React, { useEffect, useState } from "react";
import { getFinishTask, getTask, getTaskCount } from "../../fetch/FetchData";
import DiagramFinishing from "../../component/template/DiagramFinishing";
import { usePathname, useRouter } from "next/navigation";
import OperatorNavigator from "@/app/component/operator/OperatorNavigator";

export default function Page() {
  const path = usePathname();
  const [orderData, setOrderData] = useState({
    finishing_stickers: {},
    finishing_poster: {},
    finishing_photography: {},
  });

  const route = useRouter();

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const userId = localStorage.getItem("user_id");
        if (userId !== null) {
          const id = parseInt(userId);
          const task = await getFinishTask();
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
      route.push("/operator/finishing-stickers");
      // make it go to path printing stickers
    } else if (index === 1) {
      route.push("/operator/finishing-poster");
      // make it go to path printing photograph
    } else {
      route.push("/operator/finishing-photography");
    }
    // add one more path to printing poster
  };

  return (
    <div className="flex justify-around relative pt-[2rem]">
      <div className="w-[95%]">
        <OperatorNavigator />
        <div
          className={`p-[3rem] rounded-tr-md shadow-md text-text text-[.7rem] flex bg-white justify-between `}
        >
          {Object?.entries(orderData).map(([key, task], index) => {
            const segments = createSegments(task);
            return (
              <div
                key={index}
                className="flex cursor-pointer justify-center"
                onClick={() => handleChangePage(index)}
              >
                <div className="">
                  <DiagramFinishing
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
    </div>
  );
}
