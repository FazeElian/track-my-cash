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

// Mutation
import { useMarkAsReadMutation } from '../../../services/notifications/mutations';

interface NotificationsTableProps {
    notifications: Notification[];
    loadingState: boolean
    // searchQueryValue: string
}

const NotificationsTable = ({ notifications, loadingState } : NotificationsTableProps) => {
    const markAsReadMutation = useMarkAsReadMutation()
    const handleMarkAsRead = (id: number) => {
        markAsReadMutation.mutate(id)
    }

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
                <motion.div
                    key={notification.id}
                    className={`item-notifications ${notification.read === false ? "" : "item-read-notifications"}`}
                    whileHover={notification.read === false ? { scale: 1.025 } : ""}
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
                    {notification.read === false ? (
                        <div className="options-item-notifications">
                            <button
                                type="button"
                                className="btn-item-notifications font-lexend"
                                onClick={() => handleMarkAsRead(notification.id)}
                            >
                                <FaCheckCircle />
                                Marcar como leído
                            </button>
                        </div>
                    ) : ""}
                </motion.div>
            ))}
        </section>
    )
}

export { NotificationsTable };