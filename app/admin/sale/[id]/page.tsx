"use client";
import React, { useEffect, useRef, useState } from "react";
import { editSale, getSale } from "@/app/fetch/FetchData";
import Button from "@/app/component/template/Button";
import { useRouter } from "next/navigation";
import { useReactToPrint } from "react-to-print";

interface Order {
  so_number: number;
  product_type: string;
  prize: number;
}

interface Sale {
  order_id: number;
  status: string;
  date: string;
  order: Order;
}

export default function Page({ params }: { params: { id: string } }) {
  const [sale, setSale] = useState<Sale | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  const route = useRouter();

  useEffect(() => {
    const orderId = params.id;
    const fetchSale = async () => {
      try {
        if (orderId) {
          const res = await getSale(orderId);
          setSale(res?.data.data[0] as Sale);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchSale();
  }, [params.id]);

  const handlePaid = async () => {
    if (sale?.status === "unpaid") {
      try {
        const id = params.id;
        const data = {
          id: parseInt(id),
          status: "paid",
        };
        await editSale(data);
        route.push("/admin/sale");
      } catch (error) {
        console.error(error);
      }
    } else {
      console.log("it's already been paid");
    }
  };

  const handleRefund = async () => {
    try {
      const id = params.id;
      const data = {
        id: parseInt(id),
        status: "refund",
      };
      await editSale(data);
      route.push("/admin/sale");
    } catch (error) {
      console.error(error);
    }
  };

  const handlePrint = useReactToPrint({
    content: () => ref.current,
  });

  // Ensure the component renders consistently even if `sale` is not yet available.
  return (
    <div className="flex justify-around relative pt-[2rem]">
      {!sale ? (
        <div>Loading ...</div>
      ) : (
        <div className="p-[3rem] rounded-md shadow-md bg-white text-text w-[95%] space-y-[1rem] text-[.7rem]">
          <Button onClick={() => route.push("/admin/sale")} className="ml-[1rem]">
            Back
          </Button>
          <h1 className="text-[2rem] font-bold px-[1rem]">Sale Detail</h1>
          <table>
            <tbody className="text-[1rem]">
              <tr>
                <td className="px-4 py-2">Order So Number</td>
                <td>:</td>
                <td className="px-4 py-2">{sale.order.so_number}</td>
              </tr>
              <tr>
                <td className="px-4 py-2">Product Type</td>
                <td>:</td>
                <td className="px-4 py-2">
                  {sale.order.product_type.replace("finishing ", "")}
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2">Prize</td>
                <td>:</td>
                <td className="px-4 py-2">
                  {new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  }).format(sale.order.prize)}
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2">Status</td>
                <td>:</td>
                <td className="px-4 py-2">{sale.status}</td>
              </tr>
            </tbody>
          </table>
          <div className="px-[1rem] flex space-x-[1rem]">
            <Button
              onClick={handlePaid}
              className="w-[5rem] bg-green-300 hover:bg-green-400 hover:text-white border border-[1.5px] border-green-400 text-green-500"
            >
              Pay
            </Button>
            <Button
              onClick={handleRefund}
              className="w-[5rem] bg-red-500 hover:bg-red-400 hover:text-white border border-[1.5px] border-red-400 text-red-500"
            >
              Refund
            </Button>
            <Button
              onClick={handlePrint}
              className="w-[5rem] bg-red-500 hover:bg-red-400 hover:text-white border border-[1.5px] border-red-400 text-red-500"
            >
              Print
            </Button>
          </div>
          <div ref={ref} className="p-[4rem] bg-white hidden print:block" >
            {/* Print content */}
            <div className="text-center ">
              <div className="">
                <h1 className="font-bold">URBAN PRINT</h1>
                <p>JL. SUNGAI SADDANG BARU 36 MAKASSAR</p>
                <p>TELP:+62-896 5266 1111</p>
                <h1 className="font-regular">SALES ORDER</h1>
              </div>
            </div>
            <div className="mb-8">
              <table className="text-left border-collapse">
                <tbody>
                  <tr className="">
                    <td className="py-2 font-bold">Sales Order No.</td>
                    <td>:</td>
                    <td className="py-2 text-right">
                      {sale.order.so_number}
                    </td>
                  </tr>
                  <tr className="">
                    <td className="py-2 font-bold">Tanggal Sales:</td>
                    <td>:</td>
                    {/* <td className="py-2 text-right">
                  {new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  }).format(totalPaid)}
                </td> */}
                  </tr>
                  <tr className="">
                    <td className="py-2 font-bold">Custumer</td>
                    <td>:</td>
                    {/* <td className="py-2 text-right">
                  {new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  }).format(totalRefund)}
                </td> */}
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-8 space-y-[5rem]">
              {/* <p className="text-sm text-gray-600">{sales?.name}</p> */}
              <p className="text-sm text-gray-600">
                {/* {dateFormat(theDate)}: __________________ */}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
