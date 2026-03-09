import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import Input from "../components/inputs/Input.jsx";
import AcceptButton from "../components/buttons/AcceptButton.jsx";
import DismissButton from "../components/buttons/DismissButton.jsx";
import AuthService from "../services/AuthService.js";

export default function Auth() {
    const [mode, setMode] = useState('login'); // 'login' | 'register'
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();

    const isRegister = mode === 'register';

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isRegister && password !== confirmPassword) {
            toast.error("Пароли не совпадают");
            return;
        }

        try {
            if (isRegister) {
                await AuthService.registerViaJWT(login, password);
                toast.success("Регистрация прошла успешно");
            } else {
                await AuthService.loginViaJWT(login, password);
                toast.success("Вход выполнен успешно");
            }

            navigate("/");
        } catch (error) {
            console.error(error);
            const msg = error?.response?.data?.message || "Ошибка авторизации";
            toast.error(msg);
        }
    };

    return (
        <div className="w-full h-full flex flex-col px-4 py-6 gap-6">
            <Toaster position="top-center" reverseOrder={false} />

            <div className="flex justify-center">
                <h1 className="text-2xl font-semibold text-main-theme">
                    {isRegister ? 'Регистрация' : 'Вход'}
                </h1>
            </div>

            <div className="flex gap-3">
                <AcceptButton
                    className={`flex-1 text-center ${!isRegister ? '' : 'opacity-50'}`}
                    text="Вход"
                    onClick={() => setMode('login')}
                />
                <DismissButton
                    className={`flex-1 text-center ${isRegister ? '' : 'opacity-50'}`}
                    text="Регистрация"
                    onClick={() => setMode('register')}
                />
            </div>

            <form className="flex flex-col gap-4 mt-2" onSubmit={handleSubmit}>
                <Input
                    className="w-full h-[3.5rem]"
                    title="Логин"
                    placeholder="Введите логин"
                    value={login}
                    onChange={(e) => setLogin(e.target.value)}
                />
                <Input
                    className="w-full h-[3.5rem]"
                    title="Пароль"
                    placeholder="Введите пароль"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {isRegister && (
                    <Input
                        className="w-full h-[3.5rem]"
                        title="Повторите пароль"
                        placeholder="Повторите пароль"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                )}

                <AcceptButton
                    className="w-full mt-4 text-center"
                    text={isRegister ? 'Зарегистрироваться' : 'Войти'}
                    onClick={handleSubmit}
                />
            </form>
        </div>
    );
}