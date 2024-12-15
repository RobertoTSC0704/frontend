import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { IoPersonAdd, IoLogIn, IoAddCircle, IoLogOut, IoPerson } from "react-icons/io5";
import { useState } from 'react';

function Navbar() {
    const { isAuthenticated, logout, user } = useAuth();
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <nav className="bg-zinc-700 my-3 flex justify-between items-center py-5 px-10 rounded-lg">
            <Link to={isAuthenticated ? '/products' : '/'}>
                <h1 className="text-2xl font-bold text-white">Productos</h1>
            </Link>
            <ul className="flex gap-x-4 items-center">
                {isAuthenticated ? (
                    <>
                        <li className="relative">
                            <button
                                className="flex items-center mx-3 px-3 text-white"
                                onClick={() => setMenuOpen(!menuOpen)}
                            >
                                <IoPerson size={30} />
                                <span className="ml-2">{user.username}</span>
                            </button>
                            {menuOpen && (
                                <ul className="absolute top-full mt-2 right-0 bg-zinc-600 text-white rounded shadow-lg py-2 w-48">
                                    <li>
                                        <Link
                                            to="/add-product"
                                            className="flex items-center px-4 py-2 hover:bg-zinc-500"
                                            onClick={() => setMenuOpen(false)}
                                        >
                                            <IoAddCircle size={20} className="mr-2" />
                                            Agregar botas
                                        </Link>
                                    </li>
                                    <li>
                                        <button
                                            onClick={() => {
                                                logout();
                                                setMenuOpen(false);
                                            }}
                                            className="flex items-center px-4 py-2 hover:bg-zinc-500 w-full text-left"
                                        >
                                            <IoLogOut size={20} className="mr-2" />
                                            Logout
                                        </button>
                                    </li>
                                </ul>
                            )}
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
