"use client";
import Button from "@/app/component/template/Button";
import Dropdown from "@/app/component/template/Dropdown";
import Input from "@/app/component/template/Input";
import { addOrder, getOperator } from "../../fetch/FetchData";
import React, { useEffect, useState } from "react";
import Datepicker from "@/app/component/template/Datepicker";
import { useRouter } from "next/navigation";
import TimeInputs from "@/app/component/template/TimeInputs";
import Image from "next/image";

export default function CreateOrder() {
  const [operators, setOperators] = useState([]);
  const [errorCreateOrder, setErrorCreateaOrder] = useState(false);

  const [orderedData, setOrderedData] = useState({
    so_number: null,
    quotation_number: null,
    order_date: "",
    required_date: "",
    sales_type: "",
    po_number: null,
    acount_rep: "",
    sales_person: "",
    custumer: "",
    contact_person: "",
    ship_to: "",
    adress: "",
    status: 1,
    product_type: "",
    id_operator: null,
    authorId: 1,
    product_width: null, //new data
    product_length: null, //new data
    cutting_width: null, //new data
    cutting_length: null, //new data
    material: "", //new data
    color: "", //new data
    coating: "", //new data
    prize: null, //new data
    quantity: null, //new data
  });

  const route = useRouter();

  const handleInput = (e: any) => {
    const name = e.target.name;
    let value = e.target.value;
    if (["so_number", "quotation_number", "po_number"].includes(name)) {
      value = parseInt(value, 10);
      if (isNaN(value)) {
        value = 0; // or handle it appropriately if value is not a valid number
      }
    }
    setOrderedData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleDropdownChange =
    (fieldName: string) => (event: React.ChangeEvent<HTMLSelectElement>) => {
      const idOperator = event.target.value;
      if (fieldName === "product_type") {
        setOrderedData((prev: any) => {
          return {
            ...prev,
            [fieldName]: idOperator,
          };
        });
      } else {
        setOrderedData((prev: any) => {
          return {
            ...prev,
            [fieldName]: parseInt(idOperator),
          };
        });
      }
    };

  // date picker handler
  const handleDate = (date: string, name: string) => {
    setOrderedData((prev) => {
      return { ...prev, [name]: date };
    });
  };

  // time picker handler
  const handleTime = (date: string, name: string) => {
    // setOrderedData((prev) => {
    //   return { ...prev, [name]: date };
    // });
  };

  const createOrder = async () => {
    const res = await addOrder(orderedData);
    console.log(res);
    console.log(orderedData);
    if (!res?.data.error) {
      route.push("/admin");
    } else {
      setErrorCreateaOrder(true);
      setTimeout(() => {
        setErrorCreateaOrder(false);
      }, 3000);
    }
  };

  useEffect(() => {
    const fetchOperators = async () => {
      try {
        const res = await getOperator();
        setOperators(res?.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchOperators();
  }, []);

  const cancel = () => {
    route.push("/admin");
  };
  console.log(orderedData);
  return (
    <div className="flex justify-around relative pt-[2rem] text-[.7rem]">
      <div className="p-[3rem] rounded-md shadow-md bg-white text-text w-[95%] space-y-[1rem]">
        <h1 className="text-[2rem] font-bold">Buat Order Baru</h1>
        <div className="flex w-full space-x-[1rem]">
          <div className="w-full space-y-[1.5rem]">
            <div className="w-full flex items-center">
              <label htmlFor="" className="w-[7rem] align-center">
                SO Number
              </label>
              <Input
                onChange={handleInput}
                name="so_number"
                value={orderedData.so_number}
              />
            </div>
            <div className="w-full flex items-center">
              <label htmlFor="" className="w-[7rem] align-center">
                Quotational Number
              </label>
              <Input
                onChange={handleInput}
                name="quotation_number"
                value={orderedData.quotation_number}
              />
            </div>
            <div className="w-full flex items-center">
              <label htmlFor="" className="w-[7rem] align-center">
                Order date
              </label>
              <TimeInputs onChange={handleDate} name="order_date" />
            </div>
            <div className="w-full flex items-center">
              <label htmlFor="" className="w-[7rem] align-center">
                Required Date
              </label>
              <TimeInputs onChange={handleDate} name="required_date" />
            </div>
            <div className="w-full flex items-center">
              <label htmlFor="" className="w-[7rem] align-center">
                Operator
              </label>
              <Dropdown
                options={operators}
                onChange={handleDropdownChange("id_operator")}
              />
            </div>
          </div>
          <div className="w-full space-y-[1.5rem]">
            <div className="w-full flex items-center">
              <label htmlFor="" className="w-[7rem] align-center">
                Sales Type
              </label>
              <Input
                onChange={handleInput}
                name="sales_type"
                value={orderedData.sales_type}
              />
            </div>
            <div className="w-full flex items-center">
              <label htmlFor="" className="w-[7rem] align-center">
                PO Number
              </label>
              <Input
                onChange={handleInput}
                name="po_number"
                value={orderedData.po_number}
              />
            </div>
            <div className="w-full flex items-center">
              <label htmlFor="" className="w-[7rem] align-center">
                Acount Rep
              </label>
              <Input
                onChange={handleInput}
                name="acount_rep"
                value={orderedData.acount_rep}
              />
            </div>
            <div className="w-full flex items-center">
              <label htmlFor="" className="w-[7rem] align-center">
                Sales Person
              </label>
              <Input
                onChange={handleInput}
                name="sales_person"
                value={orderedData.sales_person}
              />
            </div>
            <div className="w-full flex items-center">
              <label htmlFor="" className="w-[7rem] align-center">
                Product-type
              </label>
              <Dropdown
                options={[
                  { id: "printing", name: "printing" },
                  { id: "finishing", name: "finishing" },
                ]}
                onChange={handleDropdownChange("product_type")}
              />
            </div>
          </div>
          {/* right section */}
          <div className="w-full flex space-x-[1rem] ">
            <div className="space-y-[1rem]">
              <div>
                <label htmlFor="">Custumer</label>
                <Input
                  onChange={handleInput}
                  name="custumer"
                  value={orderedData.custumer}
                />
              </div>
              <div>
                <label htmlFor="">Contact Person</label>
                <Input
                  onChange={handleInput}
                  name="contact_person"
                  value={orderedData.contact_person}
                />
              </div>
            </div>
            <div className="space-y-[1rem]">
              <div>
                <label htmlFor="">Address</label>
                <Input
                  onChange={handleInput}
                  name="adress"
                  value={orderedData.adress}
                />
              </div>
              <div>
                <label htmlFor="">Ship To</label>
                <Input
                  onChange={handleInput}
                  name="ship_to"
                  value={orderedData.ship_to}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="pt-[1rem]">
          <div className="space-y-[1rem]">
            <h2 className="text-[1rem] font-bold">Order Information</h2>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center space-y-[1rem] text-[1rem]">
                <div className="w-full h-64 overflow-hidden">
                  <Image
                    src="/stickers.png"
                    alt=""
                    className="w-full h-full object-cover"
                    width={500}
                    height={500}
                  />
                </div>
                <p>Sticker</p>
              </div>
              <div className="text-center space-y-[1rem] text-[1rem]">
                <div className="w-full h-64 overflow-hidden">
                  <Image
                    src="/potography.png"
                    alt=""
                    className="w-full h-full object-cover"
                    width={500}
                    height={500}
                  />
                </div>
                <p>Potography</p>
              </div>
              <div className="text-center space-y-[1rem] text-[1rem]">
                <div className="w-full h-64 overflow-hidden">
                  <Image
                    src="/poster.png"
                    alt=""
                    className="w-full h-full object-cover"
                    width={500}
                    height={500}
                  />
                </div>
                <p>Poster</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex pt-[2rem]">
          <div className="w-[70%] pr-[2rem] space-y-[2rem]">
            <div className="flex space-x-[2rem]">
              <label className="w-[30%]">Product Size</label>
              <div className="w-full">
                <Input
                  onChange={handleInput}
                  name="ship_to"
                  value={orderedData.ship_to}
                />
                <p>Size Width / Centimeter</p>
              </div>
              <div className="w-full">
                <Input
                  onChange={handleInput}
                  name="ship_to"
                  value={orderedData.ship_to}
                />
                <p>Size Length / Centimeter</p>
              </div>
            </div>
            <div className="flex space-x-[2rem]">
              <label className="w-[30%]">Cutting Size</label>
              <div className="w-full">
                <Input
                  onChange={handleInput}
                  name="ship_to"
                  value={orderedData.ship_to}
                />
                <p>Size Width / Centimeter</p>
              </div>
              <div className="w-full">
                <Input
                  onChange={handleInput}
                  name="ship_to"
                  value={orderedData.ship_to}
                />
                <p>Size Length / Centimeter</p>
              </div>
            </div>
            <div className="flex">
              <label className="w-[19%]">Material</label>
              <Dropdown
                options={[
                  { id: "printing", name: "printing" },
                  { id: "finishing", name: "finishing" },
                ]}
                onChange={handleDropdownChange("product_type")}
              />
            </div>
            <div className="flex">
              <label className="w-[19%]">Color</label>
              <Dropdown
                options={[
                  { id: "printing", name: "printing" },
                  { id: "finishing", name: "finishing" },
                ]}
                onChange={handleDropdownChange("product_type")}
              />
            </div>
            <div className="flex">
              <label className="w-[19%]">Coating</label>
              <Dropdown
                options={[
                  { id: "printing", name: "printing" },
                  { id: "finishing", name: "finishing" },
                ]}
                onChange={handleDropdownChange("product_type")}
              />
            </div>
            <div className="flex">
              <label className="w-[19%]">quantity</label>
              <Input
                onChange={handleInput}
                name="ship_to"
                value={orderedData.ship_to}
              />
            </div>
          </div>
          <div className="w-[30%]">bisa</div>
        </div>
        <div className="flex space-x-[1rem] pt-[1rem]">
          <Button onClick={createOrder}>Save Order</Button>
          <Button onClick={cancel}>Cancel</Button>
        </div>
      </div>
    </div>
  );
}
