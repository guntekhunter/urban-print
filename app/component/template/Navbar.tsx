"use client";
import { getUser } from "@/app/fetch/FetchData";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

interface User {
  name: string;
  email: string;
  type: string;
}

export default function Navbar() {
  const path = usePathname();
  const [user, setUser] = useState<User | null>(null);

  const [isDrop, setIsDrop] = useState(false);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

  const [idUser, setUserId] = useState<string | null>(null);

  useEffect(() => {
    // Check if window is defined to ensure this code runs only on the client side
    if (typeof window !== "undefined") {
      const userId = localStorage.getItem("user_id");
      setUserId(userId);
    }
  }, []);


  const route = useRouter();

  const handleDrop = () => {
    setIsDrop(!isDrop);
  };

  const logout = () => {
    setIsDrop(!isDrop);
    localStorage.removeItem("user_id");
    // Cookies.remove("token");
    // Cookies.remove("user id");
    // Cookies.remove("isAdmin");
    route.push("/");
  };



  useEffect(() => {
    const fetchUser = async () => {
      const id = idUser;
      if (id) {
        try {
          const res = await getUser(parseInt(id));
          console.log("User response:", res);
          setUser(res?.data?.data || null);
        } catch (error) {
          console.error("Error fetching user:", error);
        }
      }
    };
    fetchUser();
  }, [idUser]);

  console.log("ini usernya", user)

  if (path === "/") {
    return <div></div>;
  } else if (path.includes("/admin")) {
    return (
      <div
        className={`py-[.8rem] flex justify-around bg-white border-b-[1.5px] sticky top-0 inset-0 bg-white bg-opacity-90 backdrop-filter backdrop-blur-md z-10`}
      >
        <div className="w-[90%] flex justify-between">
          <div className="">
            <Image src="/logo.jpeg" alt="" width={1000} height={1000} className="w-[3rem]" />
          </div>
          <div className="flex items-center space-x-[1rem]">
            <p>{user ? user.email : "Loading..."}</p>
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
          <div className="">
            <Image src="/logo.jpeg" alt="" width={1000} height={1000} className="w-[3rem]" />
          </div>
          <div className="flex items-center space-x-[1rem]">
            <p>{user ? user.email : "Loading..."}</p>
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
          <div className="">
            <Image src="/logo.jpeg" alt="" width={1000} height={1000} className="w-[3rem]" />
          </div>
          <div className="flex items-center space-x-[1rem]">
            <p>{user ? user.email : "Loading..."}</p>
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
