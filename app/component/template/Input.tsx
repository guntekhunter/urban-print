import React from 'react'

export default function Input(props:any) {
  return (
    <input className="w-full h-[2rem] px-[1rem] rounded-md border-[1.4px] border-gray-200 text-[.9rem]"
    type={props.type}
    autoComplete="off" onChange={props.onChange} value={props.value} name={props.name}/>
  )
}
