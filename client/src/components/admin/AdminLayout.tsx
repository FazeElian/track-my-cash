import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Toaster } from "sonner";

// Styles for this component
import "../../assets/css/components/admin/AdminLayout.css";

// Logo
import Logo from "../../assets/img/Logo.webp";

// Lucide react icons
import {
    DashboardIcon,
    MovementsIcon,
    GoalIcon,
    NotificationsIcon,
    UnreadNotificationsIcon,
    LogOutIcon,
    MenuIcon,
    ArrowToRightIcon
} from "../../lib/lists/Icons";

// Queries
import { useGetAuthenticatedUser } from "../../services/auth/queries";
import { useFetchAllNotifications } from "../../services/notifications/queries";

// Types
import type { User } from "../../lib/types/services/user.type";
import type { Notification } from "../../lib/types/services/notification.type";

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

    // Check if there's notifications that are not read
    const { data: notifications } = useFetchAllNotifications()

    // Notifications with read === true
    const notReadNotifications : Notification[] = []

    if (Array.isArray(notifications)) {
        notifications.forEach(notification => {
            if(notification.read === false) {
                notReadNotifications.push(notification)
            }
        });
    }

    // get authenticated user result from query
    const { data: userResult, isError, isLoading } = useGetAuthenticatedUser();

    if (isLoading) {
        return <Loading />;
    }

    if (isError) {
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
                            <MenuIcon />
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
                                <DashboardIcon />
                                Panel
                            </Link>
                            <Link
                                to="/admin/transactions"
                                className={`item-nav-list-side-bar
                                    ${location.pathname === "/admin/transactions" ? "item-active-nav-list-side-bar" : ""}
                                `}
                                onClick={() => setSideBar(false)}
                            >
                                <MovementsIcon />
                                Movimientos
                            </Link>
                            <Link
                                to="/admin/goals"
                                className={`item-nav-list-side-bar
                                    ${location.pathname === "/admin/goals" ? "item-active-nav-list-side-bar" : ""}
                                `}
                                onClick={() => setSideBar(false)}
                            >
                                <GoalIcon />
                                Metas
                            </Link>
                            <Link
                                to="/admin/notifications"
                                className={`item-nav-list-side-bar
                                    ${location.pathname === "/admin/notifications" ? "item-active-nav-list-side-bar" : ""}
                                `}
                                onClick={() => setSideBar(false)}
                            >
                                {notReadNotifications.length > 0 ? (
                                    <UnreadNotificationsIcon />
                                ) : (
                                    <NotificationsIcon />
                                )}
                                Notificaciones
                            </Link>
                            <button
                                type="button"
                                className="item-nav-list-side-bar item-logout-list-side-bar font-lexend"
                                onClick={logOut}
                            >
                                <LogOutIcon />
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
                                <ArrowToRightIcon />
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