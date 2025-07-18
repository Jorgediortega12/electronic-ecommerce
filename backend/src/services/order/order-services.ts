import { PrismaClient, OrderStatus } from "@prisma/client";
import { sendOrderConfirmationEmail } from "../../utils/mailer";

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
  if (!userId || typeof userId !== "number" || isNaN(userId)) {
    throw new Error("ID de usuario inválido");
  }

  return await prisma.order.findMany({
    where: { userId: userId },
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
  if (!orderId || typeof orderId !== "number" || isNaN(orderId)) {
    throw new Error("ID de orden inválido");
  }

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
  if (!orderId || typeof orderId !== "number" || isNaN(orderId)) {
    throw new Error("ID de orden inválido");
  }

  return await prisma.order.update({
    where: { id: orderId },
    data: { status }
  });
};

export const notifyOrderConfirmationService = async ({
  userEmail,
  orderId,
  total
}: {
  userEmail: string;
  orderId: number;
  total: number;
}) => {
  try {
    await sendOrderConfirmationEmail(userEmail, orderId, total);
    return { success: true };
  } catch (error) {
    console.error("Error al enviar confirmación de pedido:", error);
    return { success: false, error };
  }
};
