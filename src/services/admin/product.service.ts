import { prisma } from "config/client";

const createProduct = async (
  name,
  price: number,
  detailDesc: string,
  shortDesc: string,
  quantity: number,
  factory: string,
  target: string,
  imageUpload: string
) => {
  await prisma.product.create({
    data: {
      name,
      price,
      detailDesc,
      shortDesc,
      quantity,
      factory,
      target,
      ...(imageUpload && { image: imageUpload }),
    },
  });
};

const getProductList = async () => {
  return await prisma.product.findMany();
};

export { createProduct, getProductList };
