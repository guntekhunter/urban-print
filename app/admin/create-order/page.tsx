"use client";
import Button from "@/app/component/template/Button";
import Dropdown from "@/app/component/template/Dropdown";
import Input from "@/app/component/template/Input";
import {
  addOrder,
  getAllOrder,
  getCustumer,
  getCustumers,
  getUser,
} from "../../fetch/FetchData";
import React, { useEffect, useState } from "react";
import Datepicker from "@/app/component/template/Datepicker";
import { useRouter } from "next/navigation";
import TimeInputs from "@/app/component/template/TimeInputs";
import Image from "next/image";
import { prize } from "@/app/functions/prizeFormater";

export interface Customer {
  name: string;
  address: string;
  contact_person: string;
  // add other properties as needed
}

export default function CreateOrder() {
  const [errorCreateOrder, setErrorCreateaOrder] = useState(false);
  const [thePize, setThePrize] = useState<number>();
  const [theQuantity, setTheQuantity] = useState<number>();
  const [user, setUser] = useState([]);
  const [custumers, setCustumers] = useState([]);
  const [custumer, setCustumer] = useState<Customer | null>(null);

  const [orderedData, setOrderedData] = useState({
    so_number: null,
    quotation_number: null,
    order_date: "",
    required_date: "",
    sales_type: "",
    po_number: null,
    acount_rep: "none",
    sales_person: "",
    custumer: "",
    contact_person: "",
    ship_to: "",
    adress: "",
    status: 1,
    product_type: "",
    id_operator: 0,
    authorId: 2,
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
    if (
      [
        "so_number",
        "quotation_number",
        "po_number",
        "quantity",
        "product_width",
        "product_length",
        "cutting_width",
        "cutting_length",
      ].includes(name)
    ) {
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
      const value = event.target.value;
      if (fieldName === "custumer") {
        const fetchCustumer = async () => {
          try {
            const data = await getCustumer(value);
            console.log(data?.data.data);
            setCustumer(data?.data.data);
          } catch (error) {
            console.log(error);
          }
        };
        fetchCustumer();
      }
      setOrderedData((prev: any) => {
        return {
          ...prev,
          [fieldName]: value,
        };
      });
    };

  // date picker handler
  const handleDate = (date: string, name: string) => {
    if (name === "order_date") {
      setOrderedData((prev) => {
        return { ...prev, [name]: date };
      });
    } else {
      setOrderedData((prev) => {
        return { ...prev, [name]: date };
      });
    }
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
    if (orderedData.cutting_length && orderedData.cutting_width) {
      const quantity = orderedData.cutting_length * orderedData.cutting_width;
      setTheQuantity(quantity);
      setOrderedData((prevData: any) => ({
        ...prevData,
        quantity,
      }));
    }
  }, [orderedData.cutting_length, orderedData.cutting_width]);

  useEffect(() => {
    console.log(theQuantity, thePize);
    if (theQuantity && thePize) {
      const totalPrize = thePize * theQuantity;
      setOrderedData((prevData: any) => ({
        ...prevData,
        ["prize"]: totalPrize,
      }));
    }
  }, [theQuantity, thePize]);

  const cancel = () => {
    route.push("/admin");
  };

  const handleProductType = (value: any) => {
    setOrderedData((prev) => {
      return { ...prev, ["product_type"]: value };
    });
    if (value === "printing potography") {
      setThePrize(3000);
    } else if (value === "printing stickers") {
      setThePrize(1000);
    } else if (value === "printing poster") {
      setThePrize(2000);
    }
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const id = localStorage.getItem("user_id");
        if (id) {
          const theId = parseInt(id);
          const data = await getUser(theId);
          setUser(data?.data.data);
          const name = data?.data.data.name;
          setOrderedData((pref: any) => ({ ...pref, ["sales_person"]: name }));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetch();
  }, []);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getAllOrder();
        const newId = data?.data.data.length;
        setOrderedData((pref: any) => ({ ...pref, ["so_number"]: newId + 1 }));
        console.log(newId);
      } catch (error) {
        console.log(error);
      }
    };
    fetchOrders();
  }, []);

  useEffect(() => {
    const fetchCustemers = async () => {
      try {
        const data = await getCustumers();
        setCustumers(data?.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCustemers();
  }, []);
  console.log(custumer);
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
                Sales Person
              </label>
              <Input
                onChange={handleInput}
                name="sales_person"
                value={orderedData.sales_person}
              />
            </div>
          </div>
          {/* right section */}
          <div className="w-full flex space-x-[1rem] ">
            <div className="space-y-[1rem]">
              <div>
                <label htmlFor="">Custumer</label>
                <Dropdown
                  options={custumers}
                  onChange={handleDropdownChange("custumer")}
                />
              </div>
              <div>
                <label htmlFor="">Contact Person</label>
                <Input
                  onChange={handleInput}
                  name="contact_person"
                  value={custumer?.contact_person}
                />
              </div>
            </div>
            <div className="space-y-[1rem]">
              <div>
                <label htmlFor="">Address</label>
                <Input
                  onChange={handleInput}
                  name="adress"
                  value={custumer?.address}
                />
              </div>
              <div>
                <label htmlFor="">Ship To</label>
                <Input
                  onChange={handleInput}
                  name="ship_to"
                  value={custumer?.address}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="pt-[1rem]">
          <div className="space-y-[1rem]">
            <h2 className="text-[1rem] font-bold">Order Information</h2>
            <div className="flex space-x-[1rem]">
              <div className="w-[70%]">
                <div className="grid grid-cols-3 gap-4">
                  <button
                    className="text-center space-y-[1rem] text-[1rem]"
                    onClick={(e) => handleProductType("printing stickers")}
                  >
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
                  </button>
                  <button
                    className="text-center space-y-[1rem] text-[1rem]"
                    onClick={() => handleProductType("printing potography")}
                  >
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
                  </button>
                  <button
                    className="text-center space-y-[1rem] text-[1rem]"
                    onClick={(e) => handleProductType("printing poster")}
                  >
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
                  </button>
                </div>
                <div className="flex pt-[2rem]">
                  <div className="w-full pr-[2rem] space-y-[2rem]">
                    <div className="flex space-x-[2rem]">
                      <label className="w-[30%]">Product Size</label>
                      <div className="w-full">
                        <Input
                          onChange={handleInput}
                          name="product_width"
                          value={orderedData.product_width}
                        />
                        <p>Size Width / Centimeter</p>
                      </div>
                      <div className="w-full">
                        <Input
                          onChange={handleInput}
                          name="product_length"
                          value={orderedData.product_length}
                        />
                        <p>Size Length / Centimeter</p>
                      </div>
                    </div>
                    <div className="flex space-x-[2rem]">
                      <label className="w-[30%]">Cutting Size</label>
                      <div className="w-full">
                        <Input
                          onChange={handleInput}
                          name="cutting_width"
                          value={orderedData.cutting_width}
                        />
                        <p>Size Width / Centimeter</p>
                      </div>
                      <div className="w-full">
                        <Input
                          onChange={handleInput}
                          name="cutting_length"
                          value={orderedData.cutting_length}
                        />
                        <p>Size Length / Centimeter</p>
                      </div>
                    </div>
                    <div className="flex">
                      <label className="w-[19%]">Material</label>
                      <Dropdown
                        options={[
                          { id: "vinyl", name: "vinyl" },
                          { id: "paper", name: "paper" },
                        ]}
                        onChange={handleDropdownChange("material")}
                      />
                    </div>
                    <div className="flex">
                      <label className="w-[19%]">Color</label>
                      <Dropdown
                        options={[
                          { id: "red", name: "red" },
                          { id: "yellow", name: "yellow" },
                        ]}
                        onChange={handleDropdownChange("color")}
                      />
                    </div>
                    <div className="flex">
                      <label className="w-[19%]">Coating</label>
                      <Dropdown
                        options={[
                          { id: "coating 1", name: "coating 1" },
                          { id: "coating 2", name: "coating 2" },
                        ]}
                        onChange={handleDropdownChange("coating")}
                      />
                    </div>
                    <div className="flex">
                      <label className="w-[19%]">quantity</label>
                      <Input
                        onChange={handleInput}
                        name="quantity"
                        value={orderedData.quantity}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-[30%] bg-gray-200 p-[1rem]">
                <h1 className="text-[.9rem] font-bold">Order Items</h1>
                <div className="space-y-[2rem]">
                  <ul className="list-disc ml-4">
                    <li>
                      Product Size: {orderedData.product_width} cm X{" "}
                      {orderedData.product_length} cm
                    </li>
                    <li>{orderedData.product_type}: </li>
                    <ul className="list-[square] ml-6">
                      <li>
                        Size:{" "}
                        {orderedData.cutting_length && orderedData.cutting_width
                          ? orderedData.cutting_width *
                            orderedData.cutting_length
                          : null}
                      </li>
                      <li>Material: {orderedData.material}</li>
                      <li>Color: {orderedData.color}</li>
                      <li>Coating: {orderedData.coating}</li>
                    </ul>
                  </ul>
                  <div className="justify-between flex">
                    <div>
                      <div>Unit Prize</div>
                      <div>Quantity</div>
                      <div>Total</div>
                    </div>
                    <div className="text-green-600 font-bold">
                      <div>{thePize ? prize(thePize) : 0}</div>
                      <div>{orderedData.quantity || 0}</div>
                      <div>
                        {prize((thePize ?? 0) * (orderedData.quantity ?? 0))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex space-x-[1rem] pt-[1rem]">
          <Button onClick={createOrder}>Save Order</Button>
          <Button onClick={cancel}>Cancel</Button>
        </div>
      </div>
    </div>
  );
}
