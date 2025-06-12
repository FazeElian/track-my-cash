import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Toaster } from "sonner";

// Styles for this component
import "../../assets/css/components/admin/AdminLayout.css";

// Logo
import Logo from "../../assets/img/Logo.webp";

// React icons
import { TbLayoutDashboard } from "react-icons/tb";
import { IoMdSwap, IoIosMenu } from "react-icons/io";
import { BiCategoryAlt } from "react-icons/bi";
import { IoNotificationsOutline } from "react-icons/io5";
import { MdOutlineLogout, MdArrowForward } from "react-icons/md";
import { GoGoal } from "react-icons/go";

// Query
import { useGetAuthenticatedUser } from "../../services/auth/queries";

// Type
import type { User } from "../../lib/types/services/user.type";

// Loadint component
import Loading from "./Loading";

// Utils
import { truncateText } from "../../lib/utils/truncateText";

// Context
import { UserContext } from "../../services/auth/context";

const AdminLayout = () => {
    const logOut = () => {
        localStorage.removeItem("AUTH_TOKEN");
        navigate("/auth/login/");
    }

    const [sideBar, setSideBar] = useState(false)

    const handleSideBar = () => {
        setSideBar(!sideBar)
    }

    const location = useLocation();
    const navigate = useNavigate()

    // get authenticated user result from query
    const userResult = useGetAuthenticatedUser();

    if (userResult === "Loading") {
        return <Loading />;
    }

    if (userResult === "Not Authenticated") {
        navigate("/auth/login")
    }

    const user = userResult as User;

    if (user) {
        return (
            <UserContext.Provider value={{ user }}>
                <aside className="side-bar">
                    <div className="top-side-bar">
                        <img src={Logo} alt="Track my cash logo" />
                        <button
                            className="btn-side-bar"
                            type="button"
                            onClick={handleSideBar}
                        >
                            <IoIosMenu />
                        </button>
                    </div>
                    <nav className={`nav-side-bar ${sideBar ? "active" : ""}`}>
                        <ul className="nav-list-side-bar">
                            <Link
                                to="/admin/dashboard"
                                className={`item-nav-list-side-bar
                                    ${location.pathname === "/admin/dashboard" ? "item-active-nav-list-side-bar" : ""}
                                `}
                                onClick={() => setSideBar(false)}
                            >
                                <TbLayoutDashboard />
                                Panel
                            </Link>
                            <Link
                                to="/admin/transactions"
                                className={`item-nav-list-side-bar
                                    ${location.pathname === "/admin/transactions" ? "item-active-nav-list-side-bar" : ""}
                                `}
                                onClick={() => setSideBar(false)}
                            >
                                <IoMdSwap />
                                Movimientos
                            </Link>
                            <Link
                                to="/admin/categories"
                                className={`item-nav-list-side-bar
                                    ${location.pathname === "/admin/categories" ? "item-active-nav-list-side-bar" : ""}
                                `}
                                onClick={() => setSideBar(false)}
                            >
                                <BiCategoryAlt />
                                Categorías
                            </Link>
                            <Link
                                to="/admin/goals"
                                className={`item-nav-list-side-bar
                                    ${location.pathname === "/admin/goals" ? "item-active-nav-list-side-bar" : ""}
                                `}
                                onClick={() => setSideBar(false)}
                            >
                                <GoGoal />
                                Metas
                            </Link>
                            <Link
                                to="/admin/notifications"
                                className={`item-nav-list-side-bar
                                    ${location.pathname === "/admin/notifications" ? "item-active-nav-list-side-bar" : ""}
                                `}
                                onClick={() => setSideBar(false)}
                            >
                                <IoNotificationsOutline />
                                Notificaciones
                            </Link>
                            <button
                                type="button"
                                className="item-nav-list-side-bar item-logout-list-side-bar font-lexend"
                                onClick={logOut}
                            >
                                <MdOutlineLogout />
                                Cerrar Sesión
                            </button>
                        </ul>
                        <Link to="/admin/account" className="user-side-bar">
                            <button className="btn-user-side-bar">
                                <img src="https://cdn-icons-png.flaticon.com/512/9187/9187604.png" alt="" />
                                <div className="txt-user-side-var font-lexend">
                                    <h1>{user.userName}</h1>
                                    <h2>{truncateText(user.email, 18)}</h2>
                                </div>
                                <MdArrowForward />
                            </button>
                        </Link>
                    </nav>
                </aside>
                
                <Toaster position="top-center" richColors />
                <Outlet />
            </UserContext.Provider>
        )
    }
}

export { AdminLayout };