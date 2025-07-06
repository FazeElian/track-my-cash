import { motion } from 'framer-motion';

// Styles for this component
import "../../../assets/css/components/admin/Notifications.css";

// Loading component
import { ModuleLoading } from '../../../components/admin/ModuleLoading';

// Lucide react icons
import {
    CheckIcon,
    GoalIcon,
    NotificationsCheckIcon
} from '../../../lib/lists/Icons';

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
    // Notifications with read === true
    const readNotifications: Notification[] = []
    notifications.forEach(notification => {
        if (notification.read === false) {
            readNotifications.push(notification)
        }
    });

    const markAsReadMutation = useMarkAsReadMutation()
    const handleMarkAsRead = (id: number) => {
        markAsReadMutation.mutate(id)
    }

    // If is loading
    if (loadingState == true) return <ModuleLoading />    

    const hasNotifications = Array.isArray(notifications) && notifications.length > 0 && readNotifications.length > 0;
    if (!hasNotifications) {
        return (
            <div className="no-notifications">
                <NotificationsCheckIcon />
                <h1>¡Todo está al día!</h1>
                <h2>No tienes notificaciones pendientes.</h2>
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
                            <GoalIcon />
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
                                <CheckIcon />
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