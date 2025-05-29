import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { Link as LinkScroll } from "react-scroll"

// Styles for this component
import "../../assets/css/components/company/Header.css";

// Logo
import Logo from "../../assets/img/Logo.webp";

// React icons
import { IoIosMenu } from "react-icons/io";
import { FiHome } from "react-icons/fi";
import { RiFunctionLine } from "react-icons/ri";

const Header = () => {
    const [menu, setMenu] = useState(false)

    const handleMenu = () => {
        setMenu(!menu)
    }

    // Disable menu on a certain scroll amount
    useEffect(() => {
        const handleScrollMenu = () => {
            const scrollThreshold = 200; // scroll acmount
            if (window.scrollY > scrollThreshold && menu) {
                setMenu(false);
            }
        };
    
        window.addEventListener('scroll', handleScrollMenu); // Add scroll event
    
        return () => {
            window.removeEventListener('scroll', handleScrollMenu);
        };
    }, [menu]);
    return (
        <>
            <header className="header">
                <nav className="nav-header">
                    <img src={Logo} alt="" />
                    <ul className={ `nav-list--header ${menu ? "active" : ""}` }>
                        <Link
                            to="/"
                            className="item-nav-header"
                            onClick={() => setMenu(false)}
                        >
                        <FiHome />
                            Inicio
                        </Link>
                        <LinkScroll
                            to="features"
                            className="item-nav-header"
                            smooth={true}
                            duration={400}
                            offset={-150}
                            onClick={() => setMenu(false)}
                        >
                            <RiFunctionLine />
                            Características
                        </LinkScroll>
                        <Link
                            to="/auth/login"
                            className="item-auth-nav-header item-auth-login-nav-header item-nav-header"
                            onClick={() => setMenu(false)}
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
                    <button
                        className="btn-header"
                        onClick={handleMenu}
                        type="button"
                    >
                        <IoIosMenu />
                    </button>
                </nav>
            </header>

            <Outlet />
        </>
    )
}

export { Header };