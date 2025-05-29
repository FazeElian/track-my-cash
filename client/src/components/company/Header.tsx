import { Link, Outlet } from "react-router-dom";
import { Link as LinkScroll } from "react-scroll"

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
                        <LinkScroll
                            to="features"
                            className="item-nav-header"
                            smooth={true}
                            duration={400}
                            offset={-150}
                        >
                            Características
                        </LinkScroll>
                        <Link
                            to="/auth/login"
                            className="item-auth-nav-header item-auth-login-nav-header item-nav-header"
                        >
                            Iniciar sesión
                        </Link>
                        <Link
                            to="/auth/register"
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