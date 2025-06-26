// React icons
import { IoNotificationsOutline } from "react-icons/io5";

// Components for this view
import { TopViewModule } from "../../../components/admin/TopTitle"
import { NotificationsTable } from "./NotificationsTable";

const NotificationsView = () => {
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
            <NotificationsTable />
        </main>
    )
}

export default NotificationsView