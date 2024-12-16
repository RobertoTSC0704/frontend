import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  IoPersonAdd,
  IoLogIn,
  IoEyeSharp,
  IoEyeOffSharp,
} from "react-icons/io5";
import ReCaptcha from "react-google-recaptcha";

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signin, isAuthenticated, errors: signInErrors } = useAuth();
  const [passwordShown, setPasswordShown] = useState(false);
  const [captchaValue, setCaptchaValue] = useState(null);
  const togglePasswordVisibility = () => {
    setPasswordShown(!passwordShown);
  };
  const navigate = useNavigate();
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/products");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  const onSubmit = handleSubmit(async (values) => {
    signin(values);
  });

  return (
    <div
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1511974035430-5de47d3b95da?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div className="bg-white max-w-md w-full p-10 rounded-lg shadow-lg">
        {signInErrors.map((error, i) => (
          <div className="bg-red-500 p-2 my-2 text-white rounded-md" key={i}>
            {error}
          </div>
        ))}
        <form onSubmit={onSubmit}>
          <h1 className="text-3xl font-bold text-center text-indigo-600 my-5">
            Inicia Sesión
          </h1>
          <label htmlFor="email" className="block text-gray-700 font-semibold">
            Email
          </label>
          <input
            type="email"
            className="w-full bg-gray-100 text-gray-800 px-4 py-2 rounded-md my-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Introduce tu correo"
            {...register("email", {
              required: "El email es obligatorio",
              pattern: {
                value:
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: "Por favor introduce un email válido",
              },
            })}
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

          <label
            htmlFor="password"
            className="block text-gray-700 font-semibold mt-4"
          >
            Contraseña
          </label>
          <div className="relative">
            <input
              type={passwordShown ? "text" : "password"}
              className="w-full bg-gray-100 text-gray-800 px-4 py-2 rounded-md my-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Introduce tu contraseña"
              {...register("password", {
                required: "La contraseña es obligatoria",
                minLength: {
                  value: 6,
                  message: "La contraseña debe tener al menos 6 caracteres",
                },
              })}
            />
            {passwordShown ? (
              <IoEyeSharp
                size={24}
                className="absolute right-3 top-3 text-gray-500 cursor-pointer"
                onClick={togglePasswordVisibility}
              />
            ) : (
              <IoEyeOffSharp
                size={24}
                className="absolute right-3 top-3 text-gray-500 cursor-pointer"
                onClick={togglePasswordVisibility}
              />
            )}
          </div>
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}

          <div className="flex items-center justify-between mt-4">
            <ReCaptcha
              sitekey="6LdQA5wqAAAAABcM_CAmEP8sRBdnr6eMeL6JU6w-"
              onChange={(value) => setCaptchaValue(value)}
            />
            <button
              type="submit"
              className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition duration-200"
              disabled={!captchaValue}
            >
              <IoLogIn size={20} className="inline-block mr-2" /> Entrar
            </button>
          </div>
        </form>

        <div className="flex items-center justify-between mt-6">
          <p className="text-gray-700">¿No tienes una cuenta?</p>
          <Link
            to="/register"
            className="text-indigo-600 hover:underline flex items-center"
          >
            Crear cuenta <IoPersonAdd size={20} className="ml-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
