import { motion } from 'framer-motion';

// Styles for this component
import "../../../assets/css/components/admin/Notifications.css";

// Loading component
import { ModuleLoading } from '../../../components/admin/ModuleLoading';

// React icons
import { GoGoal } from "react-icons/go";
import { FaCheckCircle } from "react-icons/fa";

// Type
import type { Notification } from '../../../lib/types/services/notification.type';

interface NotificationsTableProps {
    notifications: Notification[];
    loadingState: boolean
    // searchQueryValue: string
}

const NotificationsTable = ({ notifications, loadingState } : NotificationsTableProps) => {
    // If is loading
    if (loadingState == true) return <ModuleLoading />    

    const hasNotifications = Array.isArray(notifications) && notifications.length > 0;
    if (!hasNotifications) {
        return (
            <div className="no-data">
                No hay notificaciones.
            </div>
        )
    }

    return (
        <section className="notifications">
            {notifications.map((notification) => (
                <motion.a
                    key={notification.id}
                    href={`/${notification.id}`}
                    className="item-notifications"
                    whileHover={{ scale: 1.025 }}
                    transition={{
                        duration: .25,
                    }}
                >
                    <div className="content-item-notificactions">
                        <div className="icon-item-notifications">
                            <GoGoal />
                        </div>
                        <div className="txt-item-notifications">
                            <h1>{notification.title}</h1>
                            <p>
                                {notification.description}
                            </p>
                        </div>
                    </div>
                    <div className="options-item-notifications">
                        <button className="btn-item-notifications font-lexend">
                            <FaCheckCircle />
                            Marcar como leído
                        </button>
                    </div>
                </motion.a>
            ))}
        </section>
    )
}

export { NotificationsTable };