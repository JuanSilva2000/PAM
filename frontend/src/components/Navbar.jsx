//import { Link } from "react-router-dom"; 
import { Link } from "react-router-dom";
import "../css/components-css/Navbar.css"

export function Navbar() {
    return (
        <nav className="navbar bg-zinc-700 my-3 flex justify-between py-5 px-10 rounded-lg">
            <h1 className="text-2xl font-bold">
                Gestor de Pacientes
            </h1>
            <ul className="buttons flex gap-x-2">
                {
                    <>
                        <li>
                            <Link to="/login" className="bg-indigo-500 px-4 py-1 rounded-md">
                                Entrar
                            </Link>
                        </li>
                        <li>
                            <Link to="/register" className="bg-indigo-500 px-4 py-1 rounded-md">
                                Registrar
                            </Link>
                        </li>
                    </>
                }
            </ul>
        </nav>
    );
}