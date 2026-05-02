import "./App.css";
import { Button } from "./components/ui/button";

export default function App() {
  return (
    <main className="max-w-4xl mx-auto p-8 space-y-6">
      <h1 className="text-3xl font-bold text-main-theme">Всё в порядке!</h1>
      <div className="prose prose-lg max-w-none">
        <p>
          Проверка <strong>Проверка</strong> <em>Проверка</em>{" "}
          <a href="#">Проверка</a>.
        </p>
      </div>
      <Button className="bg-main-theme text-white px-4 py-2 rounded-lg hover:brightness-95 transition h-12">
        Проверка
      </Button>
    </main>
  );
}
