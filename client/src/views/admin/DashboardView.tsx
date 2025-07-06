// Lucide react icons
import { DashboardIcon } from "../../lib/lists/Icons";

// Components for this view
import { TopViewModule } from "../../components/admin/TopTitle"
import { DashboardStats } from "../../components/admin/molecules/DashboardStats"
import { DashboardCharts } from "../../components/admin/molecules/DashboardCharts"

// Title hook
import { useDocumentTitle } from "../..//lib/hooks/useDocumentTitle";

const DashboardView = () => {
    // Title
    useDocumentTitle("Panel Principal - Track My Cash")

    return (
        <main className="content-page--admin">
            <TopViewModule
                title="Panel Principal"
                icon={DashboardIcon}
                txtBtnAdd="Registrar movimiento"
                txtBtnAddShort="Registrar"
                btnAddOnClick={() => console.log()}
                quickState1Value={""}
                quickState2Value={""}
                quickState3Value={""}
                onSearchSubmit={() => console.log()}
            />
            <h2 className="welcome-message">
                ¡Bienvenido de vuelta! Aquí está tu resumen financiero.
            </h2>
            <DashboardStats />
            <DashboardCharts />
        </main>
    )
}

export default DashboardView