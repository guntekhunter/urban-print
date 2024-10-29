import React from "react";

export default function Button(props: any) {
  return (
    <button
      onClick={props.onClick}
      className={`${props.className} px-[1rem] rounded-md font-semibold ease-in duration-200 h-[2.5rem] hover:bg-[#FFA92B] flex justify-around items-center bg-[#F08F01] text-white `}
    >
      {props.children}
    </button>
  );
}
