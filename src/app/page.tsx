import OrderHistoryPage from "./orders/history/page";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <h1 className="text-2xl font-bold mb-10 text-center text-black">
          Bienvendio a Electronic - Ecommerce
          <OrderHistoryPage />
        </h1>
      </div>
    </main>
  );
}
