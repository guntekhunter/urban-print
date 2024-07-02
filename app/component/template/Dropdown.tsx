"use client";
import Image from "next/image";
import React, { useState } from "react";

export default function Dropdown(props: any) {
  const [isOpen, setIsOpen] = useState(false);

  const handleDropdownClick = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionChange = (event: any) => {
    setIsOpen(true);
    props.onChange(event);
  };
  return (
    <div className="relative w-full">
      <select
        className="w-full h-[2rem] px-[.5rem] rounded-md border-[1.4px] border-gray-200 text-[.9rem] appearance-none"
        onClick={handleDropdownClick}
        onChange={handleOptionChange}
      >
        <option value="" disabled selected>
          Select
        </option>
        {props.options.map((option: any, key: any) => (
          <option key={key} value={option.id}>
            {option.name}
          </option>
        ))}
      </select>
      <div
        className={`absolute right-[1rem] top-1/2 transform -translate-y-1/2 transition-transform ${
          isOpen ? "rotate-90" : "rotate-0"
        }`}
      >
        <Image
          src="/arrow.png"
          alt=""
          width={500}
          height={500}
          className="w-[1rem]"
        />
      </div>
    </div>
  );
}
