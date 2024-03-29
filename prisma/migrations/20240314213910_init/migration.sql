-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Prospect" (
    "id" SERIAL NOT NULL,
    "user_id_fk" INTEGER NOT NULL,
    "organization_name" VARCHAR(50) NOT NULL,
    "contact_person" VARCHAR(100) NOT NULL,
    "type" VARCHAR(20) NOT NULL,
    "email" VARCHAR(50) NOT NULL,
    "identity_document" VARCHAR(20) NOT NULL,
    "whatsapp" VARCHAR(20) NOT NULL,
    "first_contact_date" TIMESTAMP(3) NOT NULL,
    "last_contact_date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Prospect_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Service" (
    "id" SERIAL NOT NULL,
    "user_ID" INTEGER NOT NULL,
    "service_name" VARCHAR(50) NOT NULL,
    "description" VARCHAR(200) NOT NULL,

    CONSTRAINT "Service_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Quotation" (
    "id" SERIAL NOT NULL,
    "prospect_id_fk" INTEGER NOT NULL,
    "service_id_fk" INTEGER NOT NULL,
    "user_id_fk" INTEGER NOT NULL,
    "net_amount" DECIMAL(10,2) NOT NULL,
    "discount" DECIMAL(2,1) NOT NULL,
    "quotation_date" TIMESTAMP(3) NOT NULL,
    "final_delivery_date" TIMESTAMP(3) NOT NULL,
    "description" VARCHAR(200) NOT NULL,
    "important" VARCHAR(300) NOT NULL,
    "billing" VARCHAR(300) NOT NULL,
    "igv_included" BOOLEAN NOT NULL,
    "type_currency" VARCHAR(20) NOT NULL,
    "bank" VARCHAR(50) NOT NULL,
    "bank_code" DECIMAL(20,0) NOT NULL,
    "interbank_code" DECIMAL(20,0) NOT NULL,
    "detraction_account" DECIMAL(20,0) NOT NULL,

    CONSTRAINT "Quotation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Stage" (
    "id" SERIAL NOT NULL,
    "quotation_id_fk" INTEGER NOT NULL,
    "stage_name" VARCHAR(50) NOT NULL,
    "delivery_time" TIMESTAMP(3) NOT NULL,
    "percentage" DECIMAL(1,1) NOT NULL,
    "advance_payment" DECIMAL(10,2) NOT NULL,
    "activities" VARCHAR(150) NOT NULL,

    CONSTRAINT "Stage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CompanyData" (
    "id" SERIAL NOT NULL,
    "commercial_name" VARCHAR(50) NOT NULL,
    "deduction_account" VARCHAR(50) NOT NULL,
    "ruc" VARCHAR(50) NOT NULL,
    "bussiness_name" VARCHAR(50) NOT NULL,
    "exchange_type" VARCHAR(20) NOT NULL,
    "address" VARCHAR(50) NOT NULL,
    "contact_number" VARCHAR(50) NOT NULL,
    "company_email" VARCHAR(50) NOT NULL,

    CONSTRAINT "CompanyData_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Prospect" ADD CONSTRAINT "Prospect_user_id_fk_fkey" FOREIGN KEY ("user_id_fk") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Service" ADD CONSTRAINT "Service_user_ID_fkey" FOREIGN KEY ("user_ID") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Quotation" ADD CONSTRAINT "Quotation_prospect_id_fk_fkey" FOREIGN KEY ("prospect_id_fk") REFERENCES "Prospect"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Quotation" ADD CONSTRAINT "Quotation_service_id_fk_fkey" FOREIGN KEY ("service_id_fk") REFERENCES "Service"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Quotation" ADD CONSTRAINT "Quotation_user_id_fk_fkey" FOREIGN KEY ("user_id_fk") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Stage" ADD CONSTRAINT "Stage_quotation_id_fk_fkey" FOREIGN KEY ("quotation_id_fk") REFERENCES "Quotation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
