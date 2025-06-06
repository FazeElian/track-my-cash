// React icons
import { TbLayoutDashboard } from "react-icons/tb"

// Components for this view
import { TopViewModule } from "../../components/admin/TopTitle"
import { DashboardStats } from "../../components/admin/molecules/DashboardStats"

const DashboardView = () => {
    return (
        <main className="content-page--admin">
            <TopViewModule
                title="Panel Principal"
                icon={TbLayoutDashboard}
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
        </main>
    )
}

export default DashboardView