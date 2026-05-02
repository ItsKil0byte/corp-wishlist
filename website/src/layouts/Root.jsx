import { Outlet } from "react-router-dom";

export default function Root() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
}
