import React from 'react'

export default function Button(props:any) {
  return (
    <button onClick={props.onClick} className="px-[1rem] rounded-md bg-green-600 text-white w-full h-[2.5rem] hover:bg-green-600 flex justify-around items-center bg-primary">
        {props.children}
    </button>
  )
}
