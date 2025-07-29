import LoginPage from "./login/page";

export default function Home() {
  return (
    <main className="h-screen flex items-center justify-center">
      <div className="w-full max-w-md">
        <LoginPage />
      </div>
    </main>
  );
}
