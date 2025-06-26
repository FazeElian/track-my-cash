// React icons
import { IoNotificationsOutline } from "react-icons/io5";

// Components for this view
import { TopViewModule } from "../../../components/admin/TopTitle"
import { NotificationsTable } from "./NotificationsTable";

// Query
import { useFetchAllNotifications } from "../../../services/notifications/queries";

const NotificationsView = () => {
    const { data: notificationsList, isLoading } = useFetchAllNotifications()

    let loadingState = false

    // If is loading
    if (isLoading) {
        loadingState = true
    }

    const notifications = Array.isArray(notificationsList) ? notificationsList : [];

    return (
        <main className="content-page--admin">
            <TopViewModule
                title="Notificaciones"
                icon={IoNotificationsOutline}
                txtBtnAdd={""}
                txtBtnAddShort={""}
                btnAddOnClick={() => console.log()}
                quickState1Value={""}
                quickState2Value={""}
                quickState3Value={""}
                onSearchSubmit={() => console.log()}
            />
            <NotificationsTable
                notifications={notifications}
                loadingState={loadingState}
            />
        </main>
    )
}

export default NotificationsView