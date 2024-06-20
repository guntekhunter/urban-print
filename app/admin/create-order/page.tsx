import Button from '@/app/component/template/Button'
import Input from '@/app/component/template/Input'
import React from 'react'

export default function CreateOrder() {
  return (
    <div className='flex justify-around relative pt-[2rem] text-[.7rem]'>
      <div className='p-[3rem] rounded-md shadow-md bg-white text-text w-[95%] space-y-[1rem]'>
        <h1 className='text-[2rem] font-bold'>Buat Order Baru</h1>
        <div className='flex w-full space-x-[1rem]'>
          <div className='w-full space-y-[1.5rem]'>
            <div className='w-full flex items-center'>
              <label htmlFor="" className='w-[7rem] align-center'>SO Number</label>
              <Input/>
            </div>
            <div className='w-full flex items-center'>
              <label htmlFor="" className='w-[7rem] align-center'>Quotational Number</label>
              <Input/>
            </div>
            <div className='w-full flex items-center'>
              <label htmlFor="" className='w-[7rem] align-center'>Order Date</label>
              <Input/>
            </div>
            <div className='w-full flex items-center'>
              <label htmlFor="" className='w-[7rem] align-center'>Required Date</label>
              <Input/>
            </div>
          </div>
          <div className='w-full space-y-[1.5rem]'>
            <div className='w-full flex items-center'>
              <label htmlFor="" className='w-[7rem] align-center'>Sales Type</label>
              <Input/>
            </div>
            <div className='w-full flex items-center'>
              <label htmlFor="" className='w-[7rem] align-center'>PO Number</label>
              <Input/>
            </div>
            <div className='w-full flex items-center'>
              <label htmlFor="" className='w-[7rem] align-center'>Acount Rep</label>
              <Input/>
            </div>
            <div className='w-full flex items-center'>
              <label htmlFor="" className='w-[7rem] align-center'>Sales Person</label>
              <Input/>
            </div>
          </div>
          {/* right section */}
          <div className='w-full flex space-x-[1rem] '>
            <div className='space-y-[1rem]'>
            <div>
              <label htmlFor="">Custumer</label>
              <Input/>
            </div>
            <div>
              <label htmlFor="">Contact Person</label>
              <Input/>
            </div>
            </div>
            <div className='space-y-[1rem]'>
            <div>
              <label htmlFor="">Address</label>
              <Input/>
            </div>
            <div>
              <label htmlFor="">Ship To</label>
              <Input/>
            </div>
            </div>
          </div>
        </div>
        <div className='flex space-x-[1rem] pt-[1rem]'>
        <Button>Save Order</Button>
        <Button>Cancel</Button>
        </div>
      </div>
    </div>
  )
}
