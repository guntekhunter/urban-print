"use client";
import React, { useEffect, useState } from "react";
import { getProductionOnTime, getTask, getTaskCount } from "../fetch/FetchData";
import Diagram from "../component/template/Diagram";
import { usePathname, useRouter } from "next/navigation";

export default function Page() {
  const path = usePathname();
  const [onTime, setOnTime] = useState(0);
  const [dateTime, setDateTime] = useState(new Date());
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

  useEffect(() => {
    const timer = setInterval(() => setDateTime(new Date()), 1000);
    return () => clearInterval(timer); // Clean up the interval on unmount
  }, []);

  const formattedDate = dateTime.toLocaleDateString();
  const formattedTime = dateTime.toLocaleTimeString();

  const changePage = (path: string) => {
    route.push(path);
  };
  useEffect(() => {
    const refreshPage = setTimeout(() => {
      window.location.reload(); // This will refresh the current page
    }, 30000); // 60000 milliseconds = 1 minute

    // Cleanup the timeout if the component unmounts
    return () => clearTimeout(refreshPage);
  }, []);

  useEffect(() => {
    const getOnTime = async () => {
      const userId = localStorage.getItem("user_id");
      if (userId !== null) {
        const id = parseInt(userId)
        // Get the current year and month
        const now = new Date();
        const formattedDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`; // Format as YYYY-MM

        const data = {
          id,
          date: formattedDate, // Send the current month in YYYY-MM format
        };
        const res = await getProductionOnTime(data)
        console.log("ommaleka", res)
        if (res?.data.data === 0) {
          setOnTime(100)
        } else {
          const countTotal = res?.data.data - res?.data.late
          const final = (countTotal / res?.data.data) * 100
          console.log()
          setOnTime(final)
        }
      }
    }
    getOnTime()
  }, [])

  return (
    <div className="flex justify-around relative pt-[2rem]">
      <div className="w-[95%]">
        <div className="flex justify-between">
          <div className={`w-[40%] flex`}>
            <div
              onClick={() => changePage("operator")}
              className={`px-[1rem] py-[.5rem] rounded-tr-[20px] rounded-tl-[5px] cursor-pointer ${path.includes("/operator") ? "bg-white" : "bg-gray-200"
                }`}
            >
              Printing
            </div>
            <div
              onClick={() => changePage("operator/finishing-task")}
              className={`px-[1rem] py-[.5rem] rounded-tr-[20px] rounded-tl-[5px] bg-gray-200 cursor-pointer`}
            >
              Finishing
            </div>
            <div
              // onClick={() => changePage("operator/finishing-task")}
              className={`px-[1rem] py-[.5rem] w-full rounded-tr-[20px] rounded-tl-[5px] bg-gray-200 w-[10rem]`}
            >
              <p className="flex">
                Date: {formattedDate} Time : {formattedTime}
              </p>
            </div>

          </div>
          <div className="px-[1rem] py-[.5rem] rounded-tr-[20px] rounded-tl-[5px] bg-gray-200 cursor-pointer">Production On Time: {onTime}%</div>
        </div>
        <div
          className={`p-[3rem] rounded-tr-md shadow-md text-text text-[.7rem] flex bg-white justify-between `}
        >
          {Object.entries(orderData).map(([key, task], index) => {
            const segments = createSegments(task);
            return (
              <div
                key={index}
                className="flex cursor-pointer justify-center"
              // onClick={() => handleChangePage(index)}
              >
                <div className="">
                  <Diagram
                    type="printing"
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
