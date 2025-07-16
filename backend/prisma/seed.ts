import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Crear categorías
  const electronics = await prisma.category.create({
    data: { name: "Electrónica" }
  });

  const clothing = await prisma.category.create({
    data: { name: "Ropa" }
  });

  const accessories = await prisma.category.create({
    data: { name: "Accesorios" }
  });

  // Crear productos
  await prisma.product.createMany({
    data: [
      { 
        name: "Smartphone Galaxy A52",
        description: "Teléfono de gama media con buena cámara",
        price: 1200.0,
        image: "https://example.com/galaxy.jpg",
        quantity: 15,
        categoryId: electronics.id
      },
      {
        name: "Camiseta blanca",
        description: "Camiseta básica de algodón",
        price: 35.99,
        image: "https://example.com/camiseta.jpg",
        quantity: 50,
        categoryId: clothing.id
      },
      {
        name: "Gafas de sol",
        description: "Gafas polarizadas con protección UV",
        price: 80.0,
        image: "https://example.com/gafas.jpg",
        quantity: 25,
        categoryId: accessories.id
      }
    ]
  });
}

main()
  .then(() => {
    console.log("✔ Datos de prueba insertados con éxito");
    return prisma.$disconnect();
  })
  .catch((error) => {
    console.error("❌ Error en el seed:", error);
    return prisma.$disconnect();
  });
