import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAllProductsServices = async () => {
  return await prisma.product.findMany();
};

export const getProductByIdServices = async (id: number) => {
  return await prisma.product.findUnique({
    where: { id }
  });
};

export const createProductServices = async (data: {
  name: string;
  description: string;
  price: number;
  image: string;
}) => {
  return await prisma.product.create({
    data
  });
};

export const updateProductServices = async (
  id: number,
  data: {
    name: string;
    description: string;
    price: number;
    image: string;
  }
) => {
  return await prisma.product.update({
    where: { id },
    data
  });
};

export const deleteProductServices = async (id: number) => {
  return await prisma.product.delete({
    where: { id }
  });
};
