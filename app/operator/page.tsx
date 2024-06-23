'use client'
import React, { useEffect, useState } from 'react'
import { getOperatorTask } from '../fetch/FetchData'

export default function page() {
  const [orderData, setOrderData] = useState([]);
  useEffect(() => {
    const fetchOpertaroTask = async () => {
      try{
        const userId = localStorage.getItem("user_id");
        console.log(userId)
        if (userId !== null) {
          const id = parseInt(userId);
          console.log(id)
          const res = await getOperatorTask(id);
          setOrderData(res?.data.data)
          console.log(res);
        } else {
            console.log("User ID not found in local storage.");
        }
      }catch(error){
        console.log(error)
      }
    }
    fetchOpertaroTask()
  }, [])
  return (
    <div className='flex justify-around relative pt-[2rem]'>
      <div className='p-[3rem] rounded-md shadow-md bg-white text-text w-[95%] space-y-[1rem] text-[.7rem]'>
        {orderData.map((item:any, key:any) => ( 
          <div key={key}>{item.Status.status}</div>
        ))}
      </div>
    </div>
  )
}
