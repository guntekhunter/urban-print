import React from 'react'

export default function OnCreateOperator(prop: any) {
    return (
        <div className='bg-red-200 w-full py-[2rem] px-[2rem] rounded-md border-[1px] border-red-400 text-red-400'>
            {prop.error}
        </div>
    )
}
