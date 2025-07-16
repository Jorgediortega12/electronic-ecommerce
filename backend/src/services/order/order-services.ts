import { PrismaClient, OrderStatus } from "@prisma/client";

const prisma = new PrismaClient();

export const createOrderServices = async (userId: number) => {
  const cartItems = await prisma.cartItem.findMany({
    where: { userId },
    include: { product: true }
  });

  if (cartItems.length === 0) {
    throw new Error("El carrito está vacío");
  }

  const total = cartItems.reduce((sum, item) => {
    return sum + item.quantity * item.product.price;
  }, 0);

  const order = await prisma.order.create({
    data: {
      userId,
      total,
      items: {
        create: cartItems.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
          price: item.product.price
        }))
      }
    },
    include: { items: true }
  });

  await prisma.cartItem.deleteMany({ where: { userId } });

  return order;
};

export const getAllOrdersService = async () => {
  return await prisma.order.findMany({
    include: {
      items: {
        include: {
          product: true
        }
      },
      user: true
    },
    orderBy: {
      createdAt: "desc"
    }
  });
};

export const getOrdersByUserService = async (userId: number) => {
  return await prisma.order.findMany({
    where: { userId },
    include: {
      items: {
        include: {
          product: true
        }
      }
    },
    orderBy: {
      createdAt: "desc"
    }
  });
};

export const getOrderByIdService = async (orderId: number) => {
  return await prisma.order.findUnique({
    where: { id: orderId },
    include: {
      items: {
        include: {
          product: true
        }
      },
      user: true
    }
  });
};

export const updateOrderStatusService = async (
  orderId: number,
  status: OrderStatus
) => {
  return await prisma.order.update({
    where: { id: orderId },
    data: { status }
  });
};
