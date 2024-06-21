"use client"
import Button from '@/app/component/template/Button'
import Dropdown from '@/app/component/template/Dropdown';
import Input from '@/app/component/template/Input'
import { addOrder, getOperator } from '../../fetch/FetchData';
import React, { useEffect, useState } from 'react';

export default function CreateOrder() {
  const [operators, setOperators] = useState([])

  const [orderedData, setOrderedData] = useState({
    so_number: 0,
    quotation_number: 0,
    order_date: "",
    required_date: "",
    sales_type: "",
    po_number: 0,
    acount_rep: "",
    sales_person: "",
    custumer: "",
    contact_person: "",
    ship_to: "",
    adress: "",
    status: 1,
    product_type: "",
    id_operator: 0,
    authorId: 1 
  }) 

  const handleInput = (e: any) => {
    const name = e.target.name;
    const value = e.target.value;
    setOrderedData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  
  const handleDropdownChange = (event:any) => {
    const idOperator = event.target.value
    setOrderedData((prev) => {
      return {
        ...prev,
        ["id_operator"]: parseInt(idOperator),
      };
    });
  };

  const createOrder = async () => {
    const res = await addOrder(orderedData)
    console.log(res)
    console.log(orderedData)
  }

  useEffect(() => {
    const fetchOperators = async () => {
      try{
        const res = await getOperator()
        console.log(res?.data.data)
        setOperators(res?.data.data)
      }catch(error){
        console.log(error)
      }
    }
    fetchOperators()
  }, [])
  return (
    <div className='flex justify-around relative pt-[2rem] text-[.7rem]'>
      <div className='p-[3rem] rounded-md shadow-md bg-white text-text w-[95%] space-y-[1rem]'>
        <h1 className='text-[2rem] font-bold'>Buat Order Baru</h1>
        <div className='flex w-full space-x-[1rem]'>
          <div className='w-full space-y-[1.5rem]'>
            <div className='w-full flex items-center'>
              <label htmlFor="" className='w-[7rem] align-center'>SO Number</label>
              <Input onChange={handleInput} name="so_number" value={orderedData.so_number} />
            </div>
            <div className='w-full flex items-center'>
              <label htmlFor="" className='w-[7rem] align-center'>Quotational Number</label>
              <Input onChange={handleInput} name="quotation_number" value={orderedData.quotation_number}/>
            </div>
            <div className='w-full flex items-center'>
              <label htmlFor="" className='w-[7rem] align-center'>Order Date</label>
              <Input onChange={handleInput} name="order_date" value={orderedData.order_date}/>
            </div>
            <div className='w-full flex items-center'>
              <label htmlFor="" className='w-[7rem] align-center'>Required Date</label>
              <Input onChange={handleInput} name="required_date" value={orderedData.required_date}/>
            </div>
            <div className='w-full flex items-center'>
              <label htmlFor="" className='w-[7rem] align-center'>Operator</label>
              <Dropdown options={operators} onChange={handleDropdownChange} />
              
            </div>
          </div>
          <div className='w-full space-y-[1.5rem]'>
            <div className='w-full flex items-center'>
              <label htmlFor="" className='w-[7rem] align-center'>Sales Type</label>
              <Input onChange={handleInput} name="sales_type" value={orderedData.sales_type}/>
            </div>
            <div className='w-full flex items-center'>
              <label htmlFor="" className='w-[7rem] align-center'>PO Number</label>
              <Input onChange={handleInput} name="po_numbe" value={orderedData.po_number}/>
            </div>
            <div className='w-full flex items-center'>
              <label htmlFor="" className='w-[7rem] align-center'>Acount Rep</label>
              <Input onChange={handleInput} name="acount_rep" value={orderedData.acount_rep}/>
            </div>
            <div className='w-full flex items-center'>
              <label htmlFor="" className='w-[7rem] align-center'>Sales Person</label>
              <Input onChange={handleInput} name="sales_person" value={orderedData.sales_person}/>
            </div>
            <div className='w-full flex items-center'>
              <label htmlFor="" className='w-[7rem] align-center'>Product-type</label>
              <Input onChange={handleInput} name="product_type" value={orderedData.product_type}/>
            </div>
          </div>
          {/* right section */}
          <div className='w-full flex space-x-[1rem] '>
            <div className='space-y-[1rem]'>
            <div>
              <label htmlFor="">Custumer</label>
              <Input onChange={handleInput} name="custumer" value={orderedData.custumer}/>
            </div>
            <div>
              <label htmlFor="">Contact Person</label>
              <Input onChange={handleInput} name="contact_person" value={orderedData.contact_person}/>
            </div>
            </div>
            <div className='space-y-[1rem]'>
            <div>
              <label htmlFor="">Address</label>
              <Input onChange={handleInput} name="adress" value={orderedData.adress}/>
            </div>
            <div>
              <label htmlFor="">Ship To</label>
              <Input onChange={handleInput} name="ship_to" value={orderedData.ship_to}/>
            </div>
            </div>
          </div>
        </div>
        <div className='flex space-x-[1rem] pt-[1rem]'>
        <Button onClick={createOrder}>Save Order</Button>
        <Button>Cancel</Button>
        </div>
      </div>
    </div>
  )
}
