import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getUserCartServices = async (userId: number) => {
  return await prisma.cartItem.findMany({
    where: { userId },
    include: { product: true }
  });
};

export const addToCartServices = async (
  userId: number,
  productId: number,
  quantity: number
) => {
  const existingItem = await prisma.cartItem.findFirst({
    where: { userId, productId }
  });

  if (existingItem) {
    return await prisma.cartItem.update({
      where: { id: existingItem.id },
      data: {
        quantity: existingItem.quantity + quantity
      }
    });
  }

  return await prisma.cartItem.create({
    data: {
      userId,
      productId,
      quantity
    }
  });
};

export const updateCartItemServices = async (
  itemId: number,
  quantity: number
) => {
  return await prisma.cartItem.update({
    where: { id: itemId },
    data: { quantity }
  });
};

export const removeFromCartServices = async (itemId: number) => {
  return await prisma.cartItem.delete({
    where: { id: itemId }
  });
};

export const clearUserCartServices = async (userId: number) => {
  return await prisma.cartItem.deleteMany({
    where: { userId }
  });
};

export const calculateCartTotalServices = async (userId: number) => {
  const items = await prisma.cartItem.findMany({
    where: { userId },
    include: { product: true }
  });

  const total = items.reduce((sum, item) => {
    return sum + item.product.price * item.quantity;
  }, 0);

  return total;
};
