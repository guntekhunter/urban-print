-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "type" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Order" (
    "id" SERIAL NOT NULL,
    "so_number" INTEGER NOT NULL,
    "quotation_number" INTEGER NOT NULL,
    "order_date" TEXT NOT NULL,
    "required_date" TIMESTAMP(3) NOT NULL,
    "sales_type" TEXT NOT NULL,
    "po_number" INTEGER NOT NULL,
    "acount_rep" TEXT NOT NULL,
    "sales_person" TEXT NOT NULL,
    "custumer" TEXT NOT NULL,
    "contact_person" TEXT NOT NULL,
    "ship_to" TEXT NOT NULL,
    "adress" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT false,
    "product_type" TEXT NOT NULL,
    "id_operator" INTEGER NOT NULL,
    "authorId" INTEGER NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
