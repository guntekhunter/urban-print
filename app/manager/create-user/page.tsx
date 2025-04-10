"use client";
import OnCreateOperator from "@/app/component/modal/OnCreateOperator";
import Button from "@/app/component/template/Button";
import Dropdown from "@/app/component/template/Dropdown";
import Input from "@/app/component/template/Input";
import {
  addCustumer,
  addUser,
  deleteCustumer,
  deleteUser,
  getAllCustumer,
  getUser,
  getUsers,
} from "@/app/fetch/FetchData";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function page() {
  const [errorCreateCustumer, setErrorCreateCustumer] = useState("");
  const [customer, setCustomer] = useState([]);
  const [custumerData, setCustumerData] = useState({
    name: "",
    type: "",
    email: "",
    password: "",
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
    const res = await addUser(custumerData);
    setErrorCreateCustumer("");
    if (!res?.data.error) {
      setCustomer(res?.data.data);
      setCustumerData({ name: "", type: "", email: "", password: "" }); // Reset the data
    } else {
      setErrorCreateCustumer(res.data.error);
      setCustumerData({ name: "", type: "", email: "", password: "" }); // Reset the data
    }
  };

  const cancel = () => {
    route.push("/admin");
  };

  useEffect(() => {
    const fetchCustumers = async () => {
      try {
        const res = await getUsers();
        setCustomer(res?.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCustumers();
  }, []);

  console.log(customer);

  const handleDelete = async (id: any) => {
    const deleteRes = await deleteUser(id);
    setCustomer(deleteRes?.data.data);
    console.log(deleteRes, "ommaleka");
  };

  const handleDropdownChange =
    (fieldName: string) => (event: React.ChangeEvent<HTMLSelectElement>) => {
      const value = event.target.value;
      setCustumerData((prev) => {
        return {
          ...prev,
          ["type"]: value,
        };
      });
    };

  useEffect(() => {
    if (custumerData.name) {
      setCustumerData((prev) => {
        return {
          ...prev,
          ["email"]: custumerData.name,
        };
      });
    }
  }, [custumerData.name]);

  console.log("errornya", errorCreateCustumer);
  return (
    <div className="flex justify-around pt-[2rem] text-[.7rem] relative">
      <div className="p-[3rem] rounded-md shadow-md bg-white text-text w-[95%] space-y-[1rem]">
        {errorCreateCustumer && (
          <OnCreateOperator error={errorCreateCustumer} />
        )}
        <h1 className="text-[2rem] font-bold">Buat User Baru</h1>
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
                Type
              </label>
              <Dropdown
                options={[
                  { id: "admin", name: "Admin" },
                  { id: "operator", name: "Operator" },
                ]}
                onChange={handleDropdownChange("material")}
              />
            </div>
            <div className="w-full flex items-center">
              <label htmlFor="" className="w-[7rem] align-center">
                Password
              </label>
              <Input
                onChange={handleInput}
                name="password"
                value={custumerData.password}
              />
            </div>
          </div>
        </div>
        <div className="flex space-x-[1rem]">
          <Button onClick={createOrder}>Add User</Button>
          <Button onClick={cancel}>Cancel</Button>
        </div>
        <table className="min-w-full divide-y divide-gray-200 rounded-md">
          <thead className="bg-gray-50">
            <tr className="px-6 py-3 text-left text-gray-500 text-[1rem] text-sm font-medium">
              <th className="px-6 py-3 text-left text-gray-500 text-[1rem] text-sm font-medium">
                No
              </th>
              <th className="px-6 py-3 text-left text-gray-500 text-[1rem] text-sm font-medium">
                User
              </th>
              <th className="px-6 py-3 text-left text-gray-500 text-[1rem] text-sm font-medium">
                Type
              </th>
              <th className="px-6 py-3 text-left text-gray-500 text-[1rem] text-sm font-medium">
                Delete
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {customer?.map((item: any, key) => (
              <tr key={key} className="cursor-pointer">
                <td className="px-6 py-4 whitespace-nowrap">{key + 1}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.type}</td>
                <td className="px-6 whitespace-no-wrap flex justify-between py-[1rem]">
                  <button
                    className="p-[.5rem] bg-red-200 border-red-300 border-[1.3px] rounded-md"
                    onClick={(e) => {
                      handleDelete(item.id);
                    }}
                  >
                    <Image
                      src="/delete.png"
                      alt=""
                      width={500}
                      height={500}
                      className="w-4"
                    />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
