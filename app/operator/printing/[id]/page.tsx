"use client";
import { getOrder } from "@/app/fetch/FetchData";
import React, { useEffect, useState } from "react";

interface OrderStatus {
  id: number;
  status: string;
}

interface OrderData {
  Status: OrderStatus;
  acount_rep: string;
  adress: string;
  authorId: number;
  contact_person: string;
  custumer: string;
  id: number;
  id_operator: number;
  order_date: string;
  po_number: number;
  product_type: string;
  quotation_number: number;
  required_date: string;
  sales_person: string;
  sales_type: string;
  ship_to: string;
  so_number: number;
}

export default function Page({ params }: { params: { id: string } }) {
  const [orderData, setOrderData] = useState<OrderData | null>(null); // Initialize with null

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const orderId = params.id;
        if (orderId !== null) {
          const id = parseInt(orderId);
          const task = await getOrder(id);
          setOrderData(task?.data.data[0] as OrderData); // Update the state with response data
        } else {
          console.log("User ID not found in local storage.");
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchTask();
  }, [params.id]); // Include params.id in the dependency array

  if (!orderData) {
    return <div>Loading...</div>; // Show a loading state until data is fetched
  }

  // Destructure orderData for easy access
  const {
    Status,
    acount_rep,
    adress,
    authorId,
    contact_person,
    custumer,
    id,
    id_operator,
    order_date,
    po_number,
    product_type,
    quotation_number,
    required_date,
    sales_person,
    sales_type,
    ship_to,
    so_number,
  } = orderData;

  return (
    <div className="flex justify-around relative pt-[2rem]">
      <div className="p-[3rem] rounded-md shadow-md bg-white text-text w-[95%] space-y-[1rem] text-[.7rem]">
        <div>
          <h1>Order Details</h1>
          <p>
            <strong>Status:</strong> {Status.status}
          </p>
          <p>
            <strong>Account Rep:</strong> {acount_rep}
          </p>
          <p>
            <strong>Address:</strong> {adress}
          </p>
          <p>
            <strong>Author ID:</strong> {authorId}
          </p>
          <p>
            <strong>Contact Person:</strong> {contact_person}
          </p>
          <p>
            <strong>Customer:</strong> {custumer}
          </p>
          <p>
            <strong>Order ID:</strong> {id}
          </p>
          <p>
            <strong>Operator ID:</strong> {id_operator}
          </p>
          <p>
            <strong>Order Date:</strong> {order_date}
          </p>
          <p>
            <strong>PO Number:</strong> {po_number}
          </p>
          <p>
            <strong>Product Type:</strong> {product_type}
          </p>
          <p>
            <strong>Quotation Number:</strong> {quotation_number}
          </p>
          <p>
            <strong>Required Date:</strong> {required_date}
          </p>
          <p>
            <strong>Sales Person:</strong> {sales_person}
          </p>
          <p>
            <strong>Sales Type:</strong> {sales_type}
          </p>
          <p>
            <strong>Ship To:</strong> {ship_to}
          </p>
          <p>
            <strong>SO Number:</strong> {so_number}
          </p>
        </div>
      </div>
    </div>
  );
}
