-- CreateTable
CREATE TABLE "public"."Todo" (
    "id" TEXT NOT NULL,
    "title" VARCHAR(50) NOT NULL,
    "memo" VARCHAR(255),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3),
    "statusId" INTEGER NOT NULL,

    CONSTRAINT "Todo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."TodoStatus" (
    "id" SERIAL NOT NULL,
    "label" TEXT NOT NULL,

    CONSTRAINT "TodoStatus_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Todo" ADD CONSTRAINT "Todo_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "public"."TodoStatus"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
