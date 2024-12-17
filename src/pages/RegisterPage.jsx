import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { IoPersonAdd, IoLogIn, IoEyeSharp, IoEyeOffSharp } from "react-icons/io5";
import ReCaptcha from "react-google-recaptcha";

function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { signup, isAuthenticated, errors: registerErrors, clearErrors } = useAuth();
  const [passwordShown, setPasswordShown] = useState(false);
  const [captchaValue, setCaptchaValue] = useState(null);
  const togglePasswordVisibility = () => setPasswordShown(!passwordShown);
  const navigate = useNavigate();

  // Redirige si el usuario ya está autenticado
  useEffect(() => {
    if (isAuthenticated) navigate("/products");
  }, [isAuthenticated, navigate]);

  // Limpia errores al desmontar el componente
  useEffect(() => {
    return () => clearErrors();
  }, [clearErrors]);

  const onSubmit = handleSubmit(async (data) => {
    await signup(data);
  });

  return (
    <div
      style={{
        backgroundImage: "url('https://via.placeholder.com/1920x1080')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        height: "100vh",
      }}
      className="flex items-center justify-center"
    >
      <div className="bg-white max-w-md w-full p-10 rounded-lg shadow-xl">
        <form onSubmit={onSubmit}>
          <h1 className="text-4xl font-bold mb-5 text-center text-indigo-600">Registrar</h1>

          <label htmlFor="username" className="block text-sm font-medium text-gray-700">
            Usuario
          </label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Username"
            {...register("username", { required: true, minLength: 5 })}
          />
          {errors.username?.type === "required" && (
            <p className="text-red-500 text-sm">Nombre de usuario requerido</p>
          )}
          {errors.username?.type === "minLength" && (
            <p className="text-red-500 text-sm">La longitud mínima es de 5 caracteres</p>
          )}

          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Email"
            {...register("email", {
              required: true,
              pattern: {
                value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
                message: "Por favor introduce un email válido",
              },
            })}
          />
          {errors.email?.type === "required" && (
            <p className="text-red-500 text-sm">Email es requerido</p>
          )}
          {errors.email?.message && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}

          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <div className="relative">
            <input
              type={passwordShown ? "text" : "password"}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Password"
              {...register("password", { required: true, minLength: 6 })}
            />
            <span
              className="absolute right-3 top-3 cursor-pointer text-gray-500"
              onClick={togglePasswordVisibility}
            >
              {passwordShown ? <IoEyeSharp size={24} /> : <IoEyeOffSharp size={24} />}
            </span>
          </div>
          {errors.password?.type === "required" && (
            <p className="text-red-500 text-sm">Contraseña requerida</p>
          )}
          {errors.password?.type === "minLength" && (
            <p className="text-red-500 text-sm">La longitud mínima es de 6 caracteres</p>
          )}

          {registerErrors.length > 0 && (
            <div className="bg-red-500 p-2 my-2 text-black rounded-lg">
              {registerErrors.map((error, i) => (
                <p key={i}>{error}</p>
              ))}
            </div>
          )}

          <button
            className="w-full bg-indigo-600 text-black px-4 py-3 rounded-lg hover:bg-indigo-500 transition-colors duration-300"
            type="submit"
            disabled={!captchaValue}
          >
            <div className="flex items-center justify-center gap-2">
              <IoPersonAdd size={20} /> Registrar
            </div>
          </button>
          <div className="flex justify-center mt-3">
            <ReCaptcha
              sitekey="6LdQA5wqAAAAABcM_CAmEP8sRBdnr6eMeL6JU6w-"
              onChange={(value) => setCaptchaValue(value)}
            />
          </div>
        </form>

        <div className="flex justify-between items-center mt-5 text-gray-600">
          ¿Ya tienes una cuenta?
          <Link
            to="/login"
            className="text-indigo-600 hover:underline flex items-center gap-1"
          >
            ¡Inicia sesión!
            <IoLogIn size={20} />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
