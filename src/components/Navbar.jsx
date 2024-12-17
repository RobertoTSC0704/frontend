import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import {
  IoPersonAdd,
  IoLogIn,
  IoLogOut,
  IoPerson,
  IoChevronDownSharp,
  IoBagAdd,
  IoBagSharp,
} from "react-icons/io5";

function Navbar() {
  const { isAuthenticated, logout, user } = useAuth();
  const navigate = useNavigate(); // Define navigate

  return (
    <nav className="bg-zinc-700 my-3 flex justify-between items-center py-5 px-10 rounded-lg">
      <Link to={isAuthenticated ? "/products" : "/"}>
        <h1 className="text-2xl font-bold">Productos</h1>
      </Link>
      <ul className="flex gap-x-4 items-center">
        {isAuthenticated ? (
          <>
            {/* Usuario autenticado */}
            <li className="flex items-center mx-3 px-3 text-white">
              <IoPerson size={30} />
              <span className="ml-2">{user?.username || "Administrador"}</span>
            </li>
            <li>
              <Menu>
                <MenuButton className="inline-flex items-center gap-2 rounded-md bg-zinc-800 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-700 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white">
                  Opciones
                  <IoChevronDownSharp className="fill-white/60" size={30} />
                </MenuButton>

                <MenuItems
                  transition
                  anchor="bottom end"
                  className="w-52 origin-top-right rounded-xl border border-white/5 bg-white/5 p-1 text-sm/6 text-white transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
                >
                  {/* Listar Productos */}
                  <MenuItem>
                    <button
                      className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10"
                      onClick={() => {
                        navigate("/products");
                      }}
                    >
                      <IoBagSharp className="fill-white/30" size={30} />
                      Listar Productos
                    </button>
                  </MenuItem>

                  {/* Agregar Productos */}
                  <MenuItem>
                    <button
                      className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10"
                      onClick={() => {
                        navigate("/add-product");
                      }}
                    >
                      <IoBagAdd className="fill-white/30" size={30} />
                      Agregar Producto
                    </button>
                  </MenuItem>

                  {/* Nuevo: Enlace al Catálogo */}
                  <MenuItem>
                    <button
                      className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10"
                      onClick={() => {
                        navigate("/catalogo");
                      }}
                    >
                      <IoBagSharp className="fill-white/30" size={30} />
                      Ver Catálogo
                    </button>
                  </MenuItem>

                  {/* Línea divisora */}
                  <div className="my-1 h-px bg-white/5" />

                  {/* Salir */}
                  <MenuItem>
                    <button
                      className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10"
                      onClick={() => {
                        logout();
                      }}
                    >
                      <IoLogOut className="size-4 fill-white/30" />
                      Salir
                    </button>
                  </MenuItem>
                </MenuItems>
              </Menu>
            </li>
          </>
        ) : (
          <>
            {/* Usuario no autenticado */}
            <li>
              <Link
                to="/login"
                className="bg-zinc-500 p-2 rounded-sm text-white flex items-center"
              >
                <IoLogIn size={30} />
                <span className="ml-2">Iniciar sesión</span>
              </Link>
            </li>
            <li>
              <Link
                to="/register"
                className="bg-zinc-500 p-2 rounded-sm text-white flex items-center"
              >
                <IoPersonAdd size={30} />
                <span className="ml-2">Registrarse</span>
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
