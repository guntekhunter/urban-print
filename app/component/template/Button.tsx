import React from "react";

export default function Button(props: any) {
  return (
    <button
      onClick={props.onClick}
      className={`${props.className} px-[1rem] rounded-md font-semibold ease-in duration-200 h-[2.5rem] hover:bg-green-600 flex justify-around items-center bg-green-500 text-white`}
    >
      {props.children}
    </button>
  );
}
