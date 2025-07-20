import LoginPage from "./auth/login/page";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center">
          <LoginPage />
        </div>
      </div>
    </main>
  );
}
