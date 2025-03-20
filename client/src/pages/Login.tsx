import { useId } from "react";
import Button from "../components/Button";
import PasswordInput from "../components/PasswordInput";
import Label from "../components/Label";
import EmailInput from "../components/EmailInput";
import { useAuth } from "../hooks/useAuth";
import { AuthContextType } from "../context/AuthContext";

const Login = () => {
  const passwordInputID = useId();
  const emailInputID = useId();

  const { login } = useAuth() as AuthContextType;

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-rose-50">
      <main className="flex overflow-hidden rounded-xl border-[.0625rem] border-gray-200 bg-white shadow-lg shadow-gray-300">
        <form action={login} className="flex flex-col p-16">
          <h1 className="mb-8 self-center text-3xl font-semibold text-rose-500">
            Es bueno verte otra vez
          </h1>
          <p className="mb-6 text-sm">
            Por favor rellena los campos con tus credenciales de inicio.
          </p>

          <div className="mb-2">
            <Label htmlFor={emailInputID} labelText="Email" required />
          </div>
          <div className="mb-4 w-full">
            <EmailInput id={emailInputID} placeholder="Your email" required />
          </div>

          <div className="mb-2">
            <Label htmlFor={passwordInputID} labelText="Password" required />
          </div>
          <div className="mb-8 w-full">
            <PasswordInput
              id={passwordInputID}
              placeholder="Your password"
              required
            />
          </div>
          <div className="mb-4 w-full">
            <Button buttonText="Iniciar Sesión" />
          </div>
        </form>
        <aside className="w-72 border-[.0625rem] border-gray-200 bg-[url(/aside_image_decor.jpg)] bg-cover bg-center"></aside>
      </main>
    </div>
  );
};

export default Login;
