"use client";
import { getUser } from "@/app/fetch/FetchData";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

interface User {
  name: string;
  email: string;
  type: string;
}

export default function Navbar() {
  const path = usePathname();
  const [user, setUser] = useState<User>();

  const [isDrop, setIsDrop] = useState(false);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

  const route = useRouter();

  const handleDrop = () => {
    setIsDrop(!isDrop);
  };

  const logout = () => {
    setIsDrop(!isDrop);
    localStorage.removeItem("user id");
    // Cookies.remove("token");
    // Cookies.remove("user id");
    // Cookies.remove("isAdmin");
    route.push("/");
  };

  useEffect(() => {
    const fetchUser = async () => {
      const id = localStorage.getItem("user_id");
      try {
        if (id) {
          const res = await getUser(parseInt(id));
          setUser(res?.data.data);
        } else {
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, []);

  console.log("ini usernya", user)

  if (path === "/") {
    return <div></div>;
  } else if (path.includes("/admin")) {
    return (
      <div
        className={`py-[.8rem] flex justify-around bg-white border-b-[1.5px] sticky top-0 inset-0 bg-white bg-opacity-90 backdrop-filter backdrop-blur-md z-10`}
      >
        <div className="w-[90%] flex justify-between">
          <div className="flex space-x-[2rem]">
            <p className="font-bold flex items-center">URBAN PRINT</p>
          </div>
          <div className="flex items-center space-x-[1rem]">
            <p>{user?.name}</p>
            <button
              className={`px-[2rem] py-[.5rem] rounded-md hover:bg-gray-100 bg-white border border-gray-200`}
              onClick={logout}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    );
  } else if (path.includes("/manager")) {
    return (
      <div
        className={`py-[.8rem] flex justify-around bg-white border-b-[1.5px] sticky top-0 inset-0 bg-white bg-opacity-90 backdrop-filter backdrop-blur-md z-10`}
      >
        <div className="w-[90%] flex justify-between">
          <div className="flex space-x-[2rem]">
            <p className="font-bold flex items-center">URBAN PRINT</p>
          </div>
          <div className="flex items-center space-x-[1rem]">
            <p>{user?.email}</p>
            <button
              className={`px-[2rem] py-[.5rem] rounded-md hover:bg-gray-100 bg-white border border-gray-200`}
              onClick={logout}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    );
  } else if (path.includes("/operator")) {
    return (
      <div
        className={`py-[.8rem] flex justify-around bg-white border-b-[1.5px] sticky top-0 inset-0 bg-white bg-opacity-90 backdrop-filter backdrop-blur-md z-10`}
      >
        <div className="w-[90%] flex justify-between">
          <div className="flex space-x-[2rem]">
            <p className="font-bold flex items-center">URBAN PRINT</p>
          </div>
          <div className="flex items-center space-x-[1rem]">
            <p>{user?.email}</p>
            <button
              className={`px-[2rem] py-[.5rem] rounded-md hover:bg-gray-100 bg-white border border-gray-200`}
              onClick={logout}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    );
  }
}
