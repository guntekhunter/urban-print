'use client'
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const route = useRouter();

  const handleLogin = async () => {
    try{
      setIsLoading(true)
      const res = await axios.post("api/user/login", {
        email: email,
        password: password
      })
      console.log(res)
      const type = res.data.user.type
      if(type === "admin"){
        route.push("/admin");
      }else if(type === "operator"){
        route.push("/operator");
      }else if(type === "sales"){
        route.push("/sales");
      }else if(type === "manager"){
        route.push("/manager");
      }
    }catch(error:any){
      setError(error.response.data.error);
      // console.log(error.response.data.error)
    }finally{
      setIsLoading(false)
    }

  }
  return (
    <div className="h-screen flex items-center justify-center bg-gray-200">
      <div className="p-[4rem] space-y-[1rem] w-[30rem] rounded-md shadow-md bg-white text-text">
        <p className="flex justify-center font-bold">LOGIN</p>
        <div className="w-full space-y-2">
          <p className="text-[.9rem]">Email</p>
          <input
            className="w-full h-[2rem] px-[1rem] rounded-md border-[1.4px] border-gray-200 text-[.9rem]"
            type="text"
            autoComplete="off"
            onChange={(e: any) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div className="space-y-2">
          <p className="text-[.9rem]">Password</p>
          <div>
            <input
              className="w-full h-[2rem] px-[1rem] rounded-md border-[1.4px] border-gray-200 text-[.9rem]"
              type="password"
              autoComplete="off"
              onChange={(e: any) => {
                setPassword(e.target.value);
              }}
            />
            <Image src="" alt="" />
          </div>
        </div>
        <div
          className={`bg-red-200 h-[2rem] flex items-center pl-4 rounded-md border-[1.4px] border-red-300 ${
            error ? "" : "hidden"
          }`}
        >
          <p className={`text-[.8rem] text-red-500 ${error ? "" : "hidden"}`}>
            {error}
          </p>
        </div>
        <div className="flex justify-around pt-[1rem]">
          <button
            onClick={handleLogin}
            className="px-[1rem] rounded-md bg-green-600 text-white w-full h-[2.5rem] hover:bg-green-600 flex justify-around items-center bg-primary"
          >
            {isLoading ? (
              <Image
                width={500}
                height={500}
                src="/spinner-of-dots.png"
                alt=""
                className="animate-spin w-[1rem] invert"
              />
            ) : (
              <p>Login</p>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
