import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAllCategoriesService = async () => {
  return await prisma.category.findMany();
};

export const createCategoryService = async (name: string) => {
  return await prisma.category.create({
    data: { name }
  });
};

export const deleteCategoryService = async (id: number) => {
  return await prisma.category.delete({
    where: { id }
  });
};


export const getProductsByCategoryService = async (categoryId: number) => {
  return await prisma.product.findMany({
    where: { categoryId }
  });
};
