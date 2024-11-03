"use client"
import Button from '@/app/component/template/Button'
import { getCustumer, getOneOrder, getOrder } from '@/app/fetch/FetchData'
import { dateFormater } from '@/app/functions/DateFormater'
import { table } from 'console'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

interface OrderStatus {
    id: number;
    status: string;
}

interface Customer {
    id: number;
    name: string;
}

interface OrderData {
    Status: OrderStatus;
    Customer: Customer;
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
    quantity: string;
    sales_type: string;
    ship_to: string;
    late: boolean;
    so_number: number;
    type: string;
    status: number;
    prize: number;
    coating: string;
    product_size: string;
    product_length: number;
    product_width: number;
}

export default function Page({ params }: { params: { id: string } }) {
    const [orderData, setOrderData] = useState<OrderData | null>(null)
    const [custumerName, setCustumerName] = useState("");
    const [productSizePhotography, setProductSizePhotography] = useState("")
    const [productType, setProductType] = useState("")

    const route = useRouter()

    useEffect(() => {
        const orderId = params.id;
        const fetchOrder = async () => {
            const res = await getOrder(orderId)
            setOrderData(res?.data.data[0] as OrderData)
            const custumer = res?.data.data[0].custumer
            const resCustumer = await getCustumer(custumer)
            setCustumerName(resCustumer?.data.data.name)
            console.log("product sizenya", res?.data.data[0].product_size)
            if (res?.data.data[0].product_size === "null") {
                setProductSizePhotography(`${res?.data.data[0].product_length}cm x ${res?.data.data[0].product_width}cm`)
            }

            if (res?.data.data[0].product_type === "printing photography" || res?.data.data[0].product_type === "finishing photography") {
                setProductType("Digital Printing")
            } else if (res?.data.data[0].product_type === "printing stickers" || res?.data.data[0].product_type === "finishing stickers") {
                setProductType("Digital Offset")
            } else if (res?.data.data[0].product_type === "printing poster" || res?.data.data[0].product_type === "finishing poster") {
                setProductType("Mercendise")
            }
        }
        fetchOrder()
    }, [params.id])

    console.log("ini typenya", productType)

    // Destructure orderData for easy access
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
        quantity,
        status,
        late,
        type,
        prize,
        so_number,
        coating,
        product_size,
        product_length,
        product_width,
    } = orderData;

    console.log(product_type)

    return (
        <div className='flex justify-around relative pt-[2rem]'>
            <div className="p-[3rem] rounded-md shadow-md bg-white text-text w-[95%] space-y-[1rem] text-[.7rem]">
                <Button onClick={() => route.push("/admin")} className="ml-[1rem]">
                    Back
                </Button>
                <h1 className="text-[2rem] font-bold px-[1rem]">Order Detail</h1>
                <table>
                    <tbody className="text-[1rem]">
                        <tr>
                            <td className="px-4 py-2">Product Name</td>
                            <td>:</td>
                            <td className="px-4 py-2">
                                {type ? type.charAt(0).toUpperCase() + type.slice(1) : ''}
                            </td>
                        </tr>
                        <tr>
                            <td className="px-4 py-2">Product Type</td>
                            <td>:</td>
                            <td className="px-4 py-2">
                                {productType}
                            </td>
                        </tr>
                        <tr>
                            <td className="px-4 py-2">Prize</td>
                            <td>:</td>
                            <td className="px-4 py-2">
                                {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(prize)}
                            </td>
                        </tr>
                        <tr>
                            <td className="px-4 py-2">So Number</td>
                            <td>:</td>
                            <td className="px-4 py-2">
                                {so_number}
                            </td>
                        </tr>
                        <tr>
                            <td className="px-4 py-2">Sales</td>
                            <td>:</td>
                            <td className="px-4 py-2">
                                {sales_person ? sales_person.charAt(0).toUpperCase() + sales_person.slice(1) : ''}
                            </td>
                        </tr>
                        <tr>
                            <td className="px-4 py-2">Quantity</td>
                            <td>:</td>
                            <td className="px-4 py-2">
                                {quantity}
                            </td>
                        </tr>
                        <tr>
                            <td className="px-4 py-2">Date Created</td>
                            <td>:</td>
                            <td className="px-4 py-2">
                                {dateFormater(order_date)}
                            </td>
                        </tr>
                        <tr>
                            <td className="px-4 py-2">Required Date</td>
                            <td>:</td>
                            <td className="px-4 py-2">
                                {dateFormater(required_date)}
                            </td>
                        </tr>
                        <tr>
                            <td className="px-4 py-2">Note</td>
                            <td>:</td>
                            <td className="px-4 py-2">
                                {sales_type ? sales_type.charAt(0).toUpperCase() + sales_type.slice(1) : ''}
                            </td>

                        </tr>
                        <tr>
                            <td className="px-4 py-2">Ship To</td>
                            <td>:</td>
                            <td className="px-4 py-2">{adress}</td>
                        </tr>
                        <tr>
                            <td className="px-4 py-2">Custumer Name</td>
                            <td>:</td>
                            <td className="px-4 py-2">
                                {custumerName ? custumerName.charAt(0).toUpperCase() + custumerName.slice(1) : ''}
                            </td>
                        </tr>
                        {
                            coating && (
                                <tr>
                                    <td className="px-4 py-2">Material</td>
                                    <td>:</td>
                                    <td className="px-4 py-2">
                                        {coating ? coating.charAt(0).toUpperCase() + coating.slice(1) : ''}
                                    </td>
                                </tr>
                            )
                        }
                        <tr>
                            <td className="px-4 py-2">Size</td>
                            <td>:</td>
                            <td className="px-4 py-2">
                                {product_size !== "null" ? product_size : productSizePhotography}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}
