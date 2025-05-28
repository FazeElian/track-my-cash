import { Link, Outlet } from "react-router-dom";

// Styles for this component
import "../../assets/css/components/company/Header.css";

// Logo
import Logo from "../../assets/img/Logo.webp";

// React icons
import { IoIosMenu } from "react-icons/io";

const Header = () => {
    return (
        <>
            <header className="header">
                <nav className="nav-header">
                    <img src={Logo} alt="" />
                    <ul className="nav-list--header">
                        <Link
                            to="/"
                            className="item-nav-header"
                        >
                            Inicio
                        </Link>
                        <Link
                            to="/"
                            className="item-nav-header"
                        >
                            Características
                        </Link>
                        <Link
                            to="/"
                            className="item-auth-nav-header item-auth-login-nav-header item-nav-header"
                        >
                            Iniciar sesión
                        </Link>
                        <Link
                            to="/"
                            className="item-auth-nav-header item-auth-register-nav-header item-nav-header"
                        >
                            Crear mi cuenta
                        </Link>
                    </ul>
                    <button className="btn-header">
                        <IoIosMenu />
                    </button>
                </nav>
            </header>

            <Outlet />
        </>
    )
}

export { Header };