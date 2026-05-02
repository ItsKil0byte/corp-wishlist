export default function Footer() {
  return (
    <footer className="w-full py-12 mt-12 border-t border-gray-100 flex flex-col md:flex-row items-center gap-4">
      <div className="text-gray-400 text-sm mx-auto">
        © {new Date().getFullYear()} Корпоративный вишлист. Разработано с
        любовью от студентов ИИТ ❤️
      </div>
    </footer>
  );
}
