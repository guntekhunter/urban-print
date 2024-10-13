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
  const [selectedProduct, setSelectedProduct] = useState("");

  const [orderedData, setOrderedData] = useState({
    so_number: null,
    quotation_number: 1,
    order_date: "",
    required_date: "",
    sales_type: "",
    po_number: 1,
    acount_rep: "none",
    sales_person: "",
    custumer: "",
    contact_person: "",
    ship_to: "",
    adress: "",
    status: 1,
    product_type: "",
    id_operator: 0,
    authorId: 0,
    product_width: 1, //new data
    product_length: 1, //new data
    product_size: "null",
    material: "", //new data
    color: "null", //new data
    coating: "", //new data
    type: "", //new data
    late: false, //new data
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
            setCustumer(data?.data.data);
            setOrderedData((prevData: any) => ({
              ...prevData,
              ["contact_person"]: data?.data.data.contact_person,
              ["adress"]: data?.data.data.address,
              ["ship_to"]: data?.data.data.address,
            }));
          } catch (error) {
            console.log(error);
          }
        };
        fetchCustumer();
      }
      console.log("bismillah", fieldName)
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

  const createOrder = async () => {
    const res = await addOrder(orderedData);
    console.log(res)
    if (!res?.data.error) {
      route.push("/admin");
    } else {
      setErrorCreateaOrder(true);
      setTimeout(() => {
        setErrorCreateaOrder(false);
      }, 3000);
    }
  };
  // useEffect(() => {
  //   if (orderedData.cutting_length && orderedData.cutting_width) {
  //     const quantity = orderedData.cutting_length * orderedData.cutting_width;
  //     setTheQuantity(quantity);
  //     setOrderedData((prevData: any) => ({
  //       ...prevData,
  //       quantity,
  //     }));
  //   }
  // }, [orderedData.cutting_length, orderedData.cutting_width]);

  // set the prize
  useEffect(() => {
    if (orderedData.type === "kartu nama") {

    }
  }, [])

  useEffect(() => {
    if (orderedData.quantity && thePize) {
      const totalPrize = thePize * orderedData.quantity;
      console.log("ini total prize", totalPrize)
      setOrderedData((prevData: any) => ({
        ...prevData,
        ["prize"]: totalPrize,
      }));
    }
  }, [orderedData.quantity, thePize]);

  console.log("xoba", orderedData, orderedData.prize, thePize)

  const cancel = () => {
    route.push("/admin");
  };

  const handleProductType = (value: any) => {
    setSelectedProduct(value);
    setOrderedData((prev) => {
      return { ...prev, ["product_type"]: value };
    });
    if (value === "printing photography") {
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
          setOrderedData((pref: any) => ({ ...pref, ["authorId"]: theId }));
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
        const orders = data?.data?.data;
        console.log(orders);
        if (orders?.length >= 1) {
          const newId = orders[orders.length - 1].id;
          setOrderedData((pref: any) => ({
            ...pref,
            ["so_number"]: newId + 1,
          }));
        } else {
          setOrderedData((pref: any) => ({
            ...pref,
            ["so_number"]: 1,
          }));
        }
      } catch (error) {
        console.log(error);
      }
    };

    console.log("Fetching orders");
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

  useEffect(() => {
    if (orderedData.product_type === "printing photography") {

      if (orderedData.product_length && orderedData.product_width) {
        setOrderedData((pref: any) => ({
          ...pref,
          ["so_number"]: `${orderedData.product_length} x ${orderedData.product_width}`,
        }));
      }
    }
  }, [])



  console.log(selectedProduct);
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
            {/* <div className="w-full flex items-center">
              <label htmlFor="" className="w-[7rem] align-center">
                Quotational Number
              </label>
              <Input
                onChange={handleInput}
                name="quotation_number"
                value={orderedData.quotation_number}
              />
            </div> */}
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
            {/* <div className="w-full flex items-center">
              <label htmlFor="" className="w-[7rem] align-center">
                Sales Type
              </label>
              <Input
                onChange={handleInput}
                name="sales_type"
                value={orderedData.sales_type}
              />
            </div> */}
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
                <label htmlFor="">Ship To Where?</label>
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
                    onClick={() => handleProductType("printing stickers")}
                  >
                    <div className="w-full h-64 overflow-hidden hover:drop-shadow-md transform duration-300 relative">
                      <div
                        className={`absolute bg-black w-full h-full opacity-0 transform duration-200 hover:opacity-70 ${selectedProduct === "printing stickers"
                          ? "opacity-70"
                          : ""
                          }`}
                      />
                      <Image
                        src="/stickers.png"
                        alt=""
                        className="w-full h-full object-cover"
                        width={500}
                        height={500}
                      />
                    </div>
                    <p>Digital Offset</p>
                  </button>

                  <button
                    className="text-center space-y-[1rem] text-[1rem]"
                    onClick={() => handleProductType("printing photography")}
                  >
                    <div className="w-full h-64 overflow-hidden hover:drop-shadow-md transform duration-300 relative">
                      <div
                        className={`absolute bg-black w-full h-full opacity-0 transform duration-200 hover:opacity-70 ${selectedProduct === "printing photography"
                          ? "opacity-70"
                          : ""
                          }`}
                      />
                      <Image
                        src="/potography.png"
                        alt=""
                        className="w-full h-full object-cover"
                        width={500}
                        height={500}
                      />
                    </div>
                    <p>Digital Printing</p>
                  </button>

                  <button
                    className="text-center space-y-[1rem] text-[1rem]"
                    onClick={() => handleProductType("printing poster")}
                  >
                    <div className="w-full h-64 overflow-hidden hover:drop-shadow-md transform duration-300 relative">
                      <div
                        className={`absolute bg-black w-full h-full opacity-0 transform duration-200 hover:opacity-70 ${selectedProduct === "printing poster"
                          ? "opacity-70"
                          : ""
                          }`}
                      />
                      <Image
                        src="/poster.png"
                        alt=""
                        className="w-full h-full object-cover"
                        width={500}
                        height={500}
                      />
                    </div>
                    <p>Merchandise</p>
                  </button>
                </div>
                {
                  selectedProduct && (
                    <div className="flex pt-[2rem]">
                      <div className="w-full pr-[2rem] space-y-[2rem]">
                        <div className="flex space-x-[2rem]">
                          <label className="w-[14%]">Product Type</label>
                          <div className="w-full">
                            {orderedData.product_type === "printing stickers" ? (
                              <Dropdown
                                options={[
                                  { id: "kartu nama", name: "kartu nama" },
                                  { id: "brosur", name: "brosur" },
                                  { id: "stiker", name: "stiker" },
                                  { id: "cetak a3", name: "cetak full A3+" },
                                ]}
                                onChange={handleDropdownChange("type")}
                              />
                            ) : orderedData.product_type ===
                              "printing photography" ? (
                              <Dropdown
                                options={[
                                  { id: "Outdor", name: "Outdor" },
                                  { id: "Indor", name: "Indor" },]}
                                onChange={handleDropdownChange("type")}
                              />
                            ) : (
                              <Dropdown
                                options={[
                                  { id: "t shirt", name: "T Shirt" },
                                  { id: "jersey", name: "Jersey" },
                                  { id: "tumbler", name: "Tumbler" },
                                  { id: "todbag", name: "Todbag" },
                                ]}
                                onChange={handleDropdownChange("type")}
                              />
                            )}
                          </div>
                        </div>
                        {
                          orderedData.type === "brosur" ? (
                            <div className="flex">
                              <label className="w-[19%]">Product Size</label>
                              <Dropdown
                                options={[
                                  { id: "A5", name: "A5" },
                                  { id: "A4", name: "A4" },
                                  { id: "1/3 A4", name: "1/3 A4" },
                                  { id: "A6", name: "A6" },
                                  { id: "A3", name: "A3" },
                                ]}
                                onChange={handleDropdownChange("product_size")}
                              />
                            </div>
                          ) : orderedData.type === "stiker" ? (
                            <div className="flex">
                              <label className="w-[19%]">Product Size</label>
                              <Dropdown
                                options={[
                                  { id: "A5", name: "A5" },
                                  { id: "A4", name: "A4" },
                                  { id: "1/3 A4", name: "1/3 A4" },
                                  { id: "A6", name: "A6" },
                                  { id: "A3", name: "A3" },
                                ]}
                                onChange={handleDropdownChange("product_size")}
                              />
                            </div>
                          ) : orderedData.type === "kartu nama" ? (
                            <div className="flex">
                              <label className="w-[19%]">Select Size</label>
                              <Dropdown
                                options={[
                                  { id: "Double Sided", name: "Double sided" },
                                  { id: "Single Sided", name: "Single Sided" },
                                ]}
                                onChange={handleDropdownChange("product_size")}
                              />
                            </div>
                          ) : (orderedData.type === "t shirt" || orderedData.type === "jersey") && (
                            <div className="flex">
                              <label className="w-[19%]">Select Size</label>
                              <Dropdown
                                options={[
                                  { id: "KIDS S", name: "KIDS S" },
                                  { id: "KIDS M", name: "KIDS M" },
                                  { id: "KIDS L", name: "KIDS L" },
                                  { id: "KIDS XL", name: "KIDS XL" },
                                  { id: "XS", name: "XS" },
                                  { id: "S", name: "S" },
                                  { id: "M", name: "M" },
                                  { id: "L", name: "L" },
                                  { id: "XL", name: "XL" },
                                  { id: "2XL", name: "2XL" },
                                  { id: "3XL", name: "3XL" },
                                ]}
                                onChange={handleDropdownChange("product_size")}
                              />
                            </div>
                          )
                        }
                        <div className={`flex ${(orderedData.product_type === "printing sticker" || orderedData.product_type === "printing poster" || orderedData.type === "brosur" || orderedData.type === "kartu nama" || orderedData.type === "stiker") && "hidden"}`}>
                          <label className="w-[19%]">Product Size</label>
                          {
                            orderedData.type === "stiker" ? (
                              <Dropdown
                                options={[
                                  { id: "A5", name: "A5" },
                                  { id: "A4", name: "A4" },
                                  { id: "1/3 A4", name: "1/3 A4" },
                                  { id: "A6", name: "A6" },
                                  { id: "A3", name: "A3" },
                                ]}
                                onChange={handleDropdownChange("product_size")}
                              />
                            ) : orderedData.product_type === "printing photography" ? (
                              <div className="flex space-x-[1.5rem]">
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
                            ) : orderedData.type === "t shirt" || orderedData.type === "jersey" ? (
                              <Dropdown
                                options={[
                                  { id: "KIDS S", name: "KIDS S" },
                                  { id: "KIDS M", name: "KIDS M" },
                                  { id: "KIDS L", name: "KIDS L" },
                                  { id: "KIDS XL", name: "KIDS XL" },
                                  { id: "XS", name: "XS" },
                                  { id: "S", name: "S" },
                                  { id: "M", name: "M" },
                                  { id: "L", name: "L" },
                                  { id: "XL", name: "XL" },
                                  { id: "2XL", name: "2XL" },
                                  { id: "3XL", name: "3XL" },
                                ]}
                                onChange={handleDropdownChange("product_size")}
                              />
                            ) : orderedData.type === "cetak a3" ? (
                              <Dropdown
                                options={[
                                  { id: "Single Sided", name: "single sided" },
                                  { id: "Double Sided", name: "double sided" },
                                ]}
                                onChange={handleDropdownChange("product_size")}
                              />
                            ) : (
                              <Dropdown
                                options={[
                                  { id: "10 x 15", name: "10 x 15" },
                                  { id: "20 x 30", name: "20 x 30" },
                                  { id: "30 x 40", name: "30 x 40" },
                                  { id: "40 x 45", name: "40 x 45" },
                                ]}
                                onChange={handleDropdownChange("product_size")}
                              />
                            )
                          }
                        </div>
                        <div className={`flex ${(orderedData.type === "jersey" || orderedData.type === "kartu nama" || orderedData.type === "brosur" || orderedData.type === "stiker" || orderedData.type === "cetak a3" || orderedData.type === "t shirt" || orderedData.product_type === "printing photography" || orderedData.type === "todbag") && "hidden"}`}>
                          <label className="w-[19%]">Media Print</label>
                          {
                            orderedData.product_type === "printing photography" ? (
                              <Dropdown
                                options={[
                                  { id: "Outdor", name: "Outdor" },
                                  { id: "Indor", name: "Indor" },
                                ]}
                                onChange={handleDropdownChange("material")}
                              />
                            ) : (
                              <Dropdown
                                options={[
                                  { id: "UV", name: "UV" },
                                  { id: "Grafir", name: "Grafir" },
                                ]}
                                onChange={handleDropdownChange("material")}
                              />
                            )
                          }
                        </div>
                        <div className={`flex ${(orderedData.product_type === "printing stickers" || orderedData.product_type === "printing photography") && "hidden"}`}>
                          {
                            orderedData.type === "jersey" ? (
                              <label className="w-[19%]">Type Print</label>
                            ) : (
                              <label className="w-[19%]">Color</label>
                            )
                          }
                          {
                            orderedData.type === "jersey" ? (
                              <Dropdown
                                options={[
                                  { id: "full print", name: "Full Print" },
                                  { id: "half print", name: "Half Print" },
                                ]}
                                onChange={handleDropdownChange("color")}
                              />
                            ) : (
                              <Dropdown
                                options={
                                  [
                                    { id: "red", name: "red" },
                                    { id: "yellow", name: "yellow" },
                                    { id: "green", name: "green" },
                                    { id: "blue", name: "blue" },
                                    { id: "white", name: "white" },
                                    { id: "black", name: "black" },
                                  ]
                                }
                                onChange={handleDropdownChange("color")}
                              />
                            )
                          }

                        </div>

                        <div className={`${(orderedData.type === "t shirt" || orderedData.type === "jersey") && "hidden"} flex`}>
                          {
                            orderedData.type === "tumbler" ? (
                              <label className="w-[19%]">Tumbler Type</label>
                            ) : orderedData.type === "todbag" ? (
                              <label className="w-[19%]">Todbag Type</label>
                            ) : (
                              <label className="w-[19%]">Material</label>
                            )
                          }
                          {
                            orderedData.type === "brosur" ? (
                              <Dropdown
                                options={[
                                  { id: "Art Paper 120gsm", name: "Art Paper 120gsm" },
                                  { id: "Art Paper 150gsm", name: "Art Paper 150gsm" },
                                  { id: "Art Paper 210gsm", name: "Art Paper 210gsm" },
                                  { id: "Art Paper 260gsm", name: "Art Paper 260gsm" },
                                  { id: "HVS 100 gsm", name: "HVS 100 gsm" },
                                ]}
                                onChange={handleDropdownChange("coating")}
                              />

                            ) : orderedData.type === "stiker" ? (
                              <Dropdown
                                options={[
                                  { id: "Sticker A3 HVS", name: "Sticker A3 HVS" },
                                  { id: "Sticker Vinyl A3 Glosy", name: "Sticker Vinyl A3 Glosy" },
                                  { id: "Sticker Vinyl A3 Matte", name: "Sticker Vinyl A3 Matte" },
                                  { id: "Sticker Vinyl A3 Transparent", name: "Sticker Vinyl A3 Transparent" },
                                  { id: "Sticker A3 Chromo Glossy", name: "Sticker A3 Chromo Glossy" },
                                  { id: "Sticker A3 Metalic Silver", name: "Sticker A3 Metalic Silver" },
                                ]}
                                onChange={handleDropdownChange("coating")}
                              />
                            ) : orderedData.type === "cetak a3" ? (
                              <Dropdown
                                options={[
                                  { id: "Art Paper 210gsm", name: "Art Paper 210gsm" },
                                  { id: "Art Paper 260gsm", name: "Art Paper 260gsm" },
                                  { id: "Art Paper 120gsm", name: "Art Paper 120gsm" },
                                  { id: "Art Paper 150gsm", name: "Art Paper 150gsm" },
                                  { id: "HVS 100 gsm", name: "HVS 100 gsm" },
                                  { id: "Sticker A3 HVS", name: "Sticker A3 HVS" },
                                  { id: "Sticker Vinyl A3 Glosy", name: "Sticker Vinyl A3 Glosy" },
                                  { id: "Sticker Vinyl A3 Matte", name: "Sticker Vinyl A3 Matte" },
                                  { id: "Sticker Vinyl A3 Transparent", name: "Sticker Vinyl A3 Transparent" },
                                  { id: "Sticker A3 Chromo Glossy", name: "Sticker A3 Chromo Glossy" },
                                  { id: "Sticker A3 Metalic Silver", name: "Sticker A3 Metalic Silver" },
                                ]}
                                onChange={handleDropdownChange("coating")}
                              />
                            ) : orderedData.product_type === "printing photography" ? (
                              <Dropdown
                                options={[
                                  { id: "Vinyl Cina", name: "Vinyl Cina" },
                                  { id: "Vinyl Korea", name: "Vinyl Korea" },
                                  { id: "Vinyl Slik Banner", name: "Vinyl Slik Banner" },
                                  { id: "Sticker Ritrama Glosy", name: "Sticker Ritrama Glosy" },
                                  { id: "Sticker Ritrama Matte", name: "Sticker Ritrama Matte" },
                                  { id: "Sticker Ritrama Transparent", name: "Sticker Ritrama Transparent" },
                                  { id: "Sticker Ritrama Blackout", name: "Sticker Ritrama Blackout" },
                                  { id: "Sticker Oneway", name: "Sticker Oneway" },
                                ]}
                                onChange={handleDropdownChange("coating")}
                              />
                            ) : orderedData.type === "todbag" ? (
                              <Dropdown
                                options={[
                                  { id: "Todbag Canvas", name: "Todbag Canvas" },
                                  { id: "Todbag Belacu", name: "Todbag Belacu" },
                                  { id: "Pouch", name: "Pouch" },
                                  { id: "Todbag Classic", name: "Todbag Classic" },

                                ]}
                                onChange={handleDropdownChange("coating")}
                              />
                            ) : orderedData.type === "tumbler" ? (
                              <Dropdown
                                options={[
                                  { id: "Tumbler Plastik", name: "Tumbler Plastik" },
                                  { id: "Tumbler Aluminium", name: "Tumbler Aluminium" },
                                  { id: "Tumbler Insert Paper", name: "Tumbler Insert Paper" },
                                  { id: "Tumbler Stainles Steel", name: "Tumbler Stainles Steel" },
                                ]}
                                onChange={handleDropdownChange("coating")}
                              />
                            ) : (<Dropdown
                              options={[
                                { id: "Art Paper 210gsm", name: "Art Paper 210gsm" },
                                { id: "Art Paper 260gsm", name: "Art Paper 260gsm" },

                              ]}
                              onChange={handleDropdownChange("coating")}
                            />
                            )
                          }

                        </div>
                        <div className="flex">
                          <label className="w-[19%]">quantity</label>
                          <Input
                            onChange={handleInput}
                            name="quantity"
                            value={orderedData.quantity}
                          />
                        </div>
                        <div className="flex">
                          <label className="w-[19%]">Note</label>
                          <textarea className="w-full px-[1rem] py-[1rem] rounded-md border-[1.4px] border-gray-200 text-[.9rem]"
                            onChange={handleInput}
                            name="sales_type"
                            value={orderedData.sales_type}
                          />
                        </div>
                      </div>
                    </div>
                  )
                }
              </div>
              <div className="w-[30%] bg-gray-200 p-[1rem]">
                <h1 className="text-[.9rem] font-bold">Order Items</h1>
                <div className="space-y-[2rem]">
                  <ul className="list-disc ml-4">
                    <li>
                      Product Size: {orderedData.product_size} cm
                    </li>
                    <li>
                      {orderedData.product_type === "printing photography" ? (
                        <>Digital Printing</>
                      ) : orderedData.product_type === "printing poster" ? (
                        <>Merchandise</>
                      ) : (
                        orderedData.product_type === "printing stickers" && (
                          <>Digital Offset</>
                        )
                      )}
                      :{" "}
                    </li>
                    <ul className="list-[square] ml-6">
                      <li>
                        Size:{" "}
                        {orderedData.product_size}
                      </li>
                      <li>Material: {orderedData.material}</li>
                      <li>Color: {orderedData.color}</li>
                      <li>Material: {orderedData.coating}</li>
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
    </div >
  );
}
