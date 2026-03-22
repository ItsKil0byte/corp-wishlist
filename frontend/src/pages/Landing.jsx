import { useNavigate } from "react-router-dom";
import FallingGifts from "../components/FallingGifts";

export default function Landing() {
    //const navigate = useNavigate();

    return (
        <div className="w-full h-full overflow-y-auto overflow-x-hidden relative bg-white no-scrollbar">
            <div className="fixed inset-0 z-0 opacity-40 pointer-events-none">
                <FallingGifts count={20}/>
            </div>

            <div className="relative z-10 flex flex-col items-center px-6 py-6 w-full max-w4xl mx-auto">
                <header className="bg-main-theme rounded-xl p-5 w-full flex justify-between items-center mb-28 shadow-lg">
                    <div className="text-2xl font-bold flex text-white items-center gap-2">
                        Корпоративный вишлист
                    </div>
                    <button className="bg-white text-main-theme font-bold py-3 px-8 rounded-xl text-lg hover:bg-main-theme-lite transition-colors">
                        Войти
                    </button>
                </header>

                <main className="flex flex-col items-center text-center w-full gap-16">
                    <section className="flex flex-col items-center gap-6 max-w-3xl">
                        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-800 leaging-tight">
                            Хватит гадать, чего хочет твой коллега <span className="text-main-theme"> на самом деле</span>
                        </h1>
                        <p className="text-lg text-main-theme-primary">
                            Наш сервис избавит вас от неловких вопросов и сэкономит время на поиск подарка для всей вашей команды.
                        </p>
                        <button className="bg-main-theme text-white font-bold mt-4 px-8 rounded-xl py-4 text-xl shadow-lg hover:scale-110 transition-transform">
                            Попробовать!
                        </button>
                    </section>

                    <section className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                        <div className="bg-main-theme-lite p-6 rounded-xl flex flex-col items-start text-left shadow-md">
                            <h3 className="text-xl font-bold mb-2">😶 Неловко просить?</h3>
                            <p className="text-main-theme-primary">
                                Больше никаких ответов в духе "мне не нужно ничего" или "я не знаю". Опишите свои предпочтения и позвольте коллегам выбрать подарок, который вам действительно понравится.
                            </p>
                        </div>
                        <div className="bg-main-theme-lite p-6 rounded-xl flex flex-col items-start text-left shadow-md">
                            <h3 className="text-xl font-bold mb-2">🤯 Сложно выбрать?</h3>
                            <p className="text-main-theme-primary">
                                Забудьте о бесконечных списках и сомнениях. Наш сервис поможет вам организовать идеи и выбрать подарок, который точно понравится вашему коллеге.
                            </p>
                        </div>
                        <div className="bg-main-theme-lite p-6 rounded-xl flex flex-col items-start text-left shadow-md">
                            <h3 className="text-xl font-bold mb-2">⏰ Нет времени?</h3>
                            <p className="text-main-theme-primary">
                                Сэкономьте время на поиски и организацию. Наш сервис сделает процесс выбора подарков быстрым, простым и приятным для всех участников.
                            </p>
                        </div>
                    </section>

                    <section className="w-full bg-main-theme rounded-xl p-10 text-white flex flex-col items-center text-center shadow-xl">
                        <h2 className="text-3xl font-bold mb-4 text-white">
                            Пусть подарки приносят радость, а не пылятся на полке!
                        </h2>
                        <p className="mb-8 max-w-lg">
                            Присоединяйтесь к платформе и сделайте праздники в офисе по-настоящему запоминающимися для всех!
                        </p>
                        <button className="bg-white text-main-theme font-bold py-3 px-8 rounded-xl text-lg hover:bg-main-theme-lite transition-colors">
                            Начать бесплатно!
                        </button>
                    </section>
                </main>

                <footer className="mt-12 mb-6 text-main-theme-primary text-sm">
                    &copy; 2026. Корпоративный вишлист.
                </footer>
            </div>
        </div>
    )
}