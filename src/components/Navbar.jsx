import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { IoPersonAdd, IoLogIn, IoAddCircle, IoLogOut, IoPerson } from "react-icons/io5";

function Navbar() {
    const { isAuthenticated, logout, user } = useAuth();

    return (
        <nav className="bg-zinc-700 my-3 flex justify-between items-center py-5 px-10 rounded-lg">
            <Link to={isAuthenticated ? '/products' : '/'}>
                <h1 className="text-2xl font-bold">Productos</h1>
            </Link>
            <ul className="flex gap-x-4 items-center">
                {isAuthenticated ? (
                    <>
                        <li className="flex items-center mx-3 px-3 text-white">
                            <IoPerson size={30} />
                            <span className="ml-2">{user.username}</span>
                        </li>
                        <li>
                            <Link
                                to="/add-product"
                                className="bg-zinc-500 p-2 rounded-sm text-white flex items-center"
                            >
                                <IoAddCircle size={30} />
                                <span className="ml-2">Agregar</span>
                            </Link>
                        </li>
                        <li>
                            <button
                                onClick={logout}
                                className="bg-zinc-500 p-2 rounded-sm text-white flex items-center"
                            >
                                <IoLogOut size={30} />
                                <span className="ml-2">Salir</span>
                            </button>
                        </li>
                    </>
                ) : (
                    <>
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
