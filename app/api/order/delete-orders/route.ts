import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const reqBody = await req.json();
  const { custumer, product_type, status, id } = reqBody;
  console.log(reqBody.id);

  if (!id) {
    // If `id` is undefined, return an error response
    return NextResponse.json(
      { error: "Order ID is required for deletion." },
      { status: 400 }
    );
  }

  try {
    // Delete the order by ID
    const deletedOrder = await prisma.order.delete({
      where: {
        id: id, // Make sure 'id' is a valid integer
      },
    });

    // Find the related sale
    const sale = await prisma.sale.findFirst({
      where: {
        order_id: id,
      },
    });

    // If a related sale exists, delete it
    if (sale) {
      await prisma.sale.delete({
        where: {
          id: sale.id,
        },
      });
    }

    // Fetch updated order data based on the provided criteria
    const orderData = await prisma.order.findMany({
      where: {
        custumer,
        status,
      },
    });

    // Return the deleted order and the updated order list
    return NextResponse.json({
      deletedData: deletedOrder,
      data: orderData,
    });
  } catch (error) {
    console.error("Error deleting order:", error);
    return NextResponse.json(
      { error: "Failed to delete order. Please check server logs." },
      { status: 500 }
    );
  }
}
