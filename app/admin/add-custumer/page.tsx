"use client";
import Button from "@/app/component/template/Button";
import Input from "@/app/component/template/Input";
import { addCustumer } from "@/app/fetch/FetchData";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function page() {
  const [errorCreateCustumer, setErrorCreateCustumer] = useState(false);
  const [custumerData, setCustumerData] = useState({
    name: "",
    address: "",
    contact: "",
  });

  const route = useRouter();

  const handleInput = (e: any) => {
    const name = e.target.name;
    let value = e.target.value;
    setCustumerData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const createOrder = async () => {
    const res = await addCustumer(custumerData);
    console.log(res);
    if (!res?.data.error) {
      route.push("/admin");
    } else {
      setErrorCreateCustumer(true);
      setTimeout(() => {
        setErrorCreateCustumer(false);
      }, 3000);
    }
  };

  const cancel = () => {
    route.push("/admin");
  };

  return (
    <div className="flex justify-around relative pt-[2rem] text-[.7rem]">
      <div className="p-[3rem] rounded-md shadow-md bg-white text-text w-[95%] space-y-[1rem]">
        <h1 className="text-[2rem] font-bold">Buat Order Baru</h1>
        <div className="flex w-full space-x-[1rem]">
          <div className="w-full space-y-[1.5rem]">
            <div className="w-full flex items-center">
              <label htmlFor="" className="w-[7rem] align-center">
                Name
              </label>
              <Input
                onChange={handleInput}
                name="name"
                value={custumerData.name}
              />
            </div>
            <div className="w-full flex items-center">
              <label htmlFor="" className="w-[7rem] align-center">
                Address
              </label>
              <Input
                onChange={handleInput}
                name="address"
                value={custumerData.address}
              />
            </div>
            <div className="w-full flex items-center">
              <label htmlFor="" className="w-[7rem] align-center">
                Contact
              </label>
              <Input
                onChange={handleInput}
                name="contact"
                value={custumerData.contact}
              />
            </div>
          </div>
        </div>
        <div className="flex space-x-[1rem]">
          <Button onClick={createOrder}>Add Custumer</Button>
          <Button onClick={cancel}>Cancel</Button>
        </div>
      </div>
    </div>
  );
}
