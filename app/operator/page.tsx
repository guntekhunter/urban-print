"use client";
import React, { useEffect, useState } from "react";
import { getOperatorTask } from "../fetch/FetchData";
import Diagram from "../component/template/Diagram";

export default function Page() {
  const [orderData, setOrderData] = useState([]);

  useEffect(() => {
    const fetchOperatorTask = async () => {
      try {
        const userId = localStorage.getItem("user_id");
        if (userId !== null) {
          const id = parseInt(userId);
          const res = await getOperatorTask(id);
          setOrderData(res?.data.data);
        } else {
          console.log("User ID not found in local storage.");
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchOperatorTask();
  }, []);

  return (
    <div className="flex justify-around relative pt-[2rem]">
      <div className="p-[3rem] rounded-md shadow-md bg-white text-text w-[95%] text-[.7rem] flex">
        {orderData.map((item: any, key: any) => {
          const segments = [
            { value: 10, color: "green-400" },
            { value: 40, color: "blue-500" },
            { value: 30, color: "red-400" },
          ];
          return (
            <div key={key} className="flex">
              <Diagram segments={segments} idPrefix={`diagram-${key}`} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
