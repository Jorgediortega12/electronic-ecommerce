import { getAllProducts } from "@/api/productApi";
import { ProductList } from "@/components/product/ProductList";
import ElegantNavbar from "@/components/navbar/Navbar";

export default async function ProductsPage() {
  const res = await getAllProducts();
  const products = Array.isArray(res.getAllProduct) ? res.getAllProduct : [];

  return (
    <>
      {/*Navbar */}
      <ElegantNavbar />

      {/*Contenido que muestra los productos disponibles en el stock */}
      <div className="container mx-auto px-4 py-8">
        {products.length === 0 ? (
          <p>No hay productos disponibles</p>
        ) : (
          <ProductList products={products} />
        )}
      </div>
    </>
  );
}
