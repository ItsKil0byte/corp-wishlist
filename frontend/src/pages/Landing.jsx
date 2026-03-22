import { useNavigate } from "react-router-dom";
import FallingGifts from "../components/FallingGifts";

export default function Landing() {
    //const navigate = useNavigate();

    return (
        <div className="w-full h-full overflow-y-auto overflow-x-hidden relative bg-white no-scrollbar">
            <div className="fixed inset-0 z-0 opacity-40 pointer-events-none">
                <FallingGifts count={20}/>
            </div>

            <div className="relative z-10 flex flex-col items-center w-full max-w-6xl mx-auto px-6">
                <header className="bg-main-theme-lite w-full flex justify-between items-center py-6 mb-24 rounded-xl px-8 mt-6 shadow-sm">
                    <div className="text-xl font-black text-main-theme tracking-tigher uppercase">
                        Корпоративный <span className="text-gray-800">вишлист</span>
                    </div>
                    <button className="bg-main-theme text-white font-bold py-2 px-8 rounded-xl text-lg shadow-sm hover:scale-110 transition-all">
                        Войти
                    </button>
                </header>

                <main className="w-full flex flex-col gap-24">
                    <section className="flex flex-col md:flex-row gap-8 md:gap-12 items-center">
                        <div className="w-full md:w-1/2 text-left">
                            <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
                                Вишлист, который <br/> <span className="text-main-theme">понимает коллег.</span>
                            </h1>
                            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-lg">
                                Создавайте вишлисты, делитесь ими со своими коллегами, объединяйтесь в группы и забудьте о выборе подарка в последнюю минуту.
                            </p>
                            <div className="flex">
                                <button className="bg-main-theme text-white font-bold py-4 px-8 rounded-xl text-lg shadow-sm hover:scale-110 transition-all">
                                    Создать вишлист
                                </button>
                            </div>
                        </div>
                        <div className="w-full md:w-1/2 flex justify-center md:justify-end">
                            <img src="https://png.pngtree.com/png-vector/20240212/ourmid/pngtree-android-mobile-frame-vector-png-image_11738345.png" 
                            alt="mock" className="w-3/4 md:w-full max-w-sm md:max-w-md h-auto"/>
                        </div>
                    </section>

                    <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="group p-8 rounded-xl bg-gray-50 hover:translate-y-[-5px] shadow-sm transition-all">
                            <div className="text-3xl mb-4">🏠</div>
                            <h3 className="text-xl font-bold mb-3">Создавайте группы</h3>
                            <p className="text-gray-600">
                                Создавайте группы для своей команды. 
                                Её участники смогут видеть вишлисты друг друга, 
                                обмениваться идеями и вместе готовиться к праздникам.
                            </p>
                        </div>
                        <div className="group p-8 rounded-xl bg-gray-50 hover:translate-y-[-5px] shadow-sm transition-all">
                            <div className="text-3xl mb-4">🔗</div>
                            <h3 className="text-xl font-bold mb-3">Делитесь вишлистами</h3>
                            <p className="text-gray-600">
                                Делитесь своими вишлистами с другими коллегами. 
                                Они откроют их в один клик, без регистрации и лишних паролей. 
                                Просто отправьте им ссылку!
                            </p>
                        </div>
                        <div className="group p-8 rounded-xl bg-gray-50 hover:translate-y-[-5px] shadow-sm transition-all">
                            <div className="text-3xl mb-4">⏰</div>
                            <h3 className="text-xl font-bold mb-3">Экономьте время</h3>
                            <p className="text-gray-600">
                                Забудьте о бесконечных обсуждениях в чатах и мучительном выборе подарков. 
                                С нашим вишлистом всё просто: вы видите, что хотят ваши коллеги, и выбираете подарок, 
                                который точно понравится.
                            </p>
                        </div>
                    </section>

                    <section className="bg-main-theme-lite rounded-xl p-12 text-center hover:translate-y-[-5px] shadow-sm transition-all">
                        <h2 className="text-3xl text-gray-900 font-bold mb-8">Сделаем праздники в вашем отделе лучше!</h2>
                        <div className="flex flex-wrap justify-center gap-12">
                            <div>
                                <div className="text-4xl font-black text-main-theme">0</div>
                                <div className="text-gray-600">Ненужных подарков</div>
                            </div>
                            <div>
                                <div className="text-4xl font-black text-main-theme">100%</div>
                                <div className="text-gray-600">Попадание в цель</div>
                            </div>
                            <div>
                                <div className="text-4xl font-black text-main-theme">2 мин</div>
                                <div className="text-gray-600">Вашего времени</div>
                            </div>
                        </div>
                    </section>
                </main>

                <footer className="w-full py-12 mt-12 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="text-gray-400 text-sm">© 2026 Корпоративный вишлист. Разработано с любовью от студентов ИИТ ❤️</div>
                </footer>
            </div>
        </div>
    )
}