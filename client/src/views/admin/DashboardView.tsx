import { useRef, useState } from "react";

// Lucide react icons
import { DashboardIcon } from "../../lib/lists/Icons";

// Components for this view
import { TopViewModule } from "../../components/admin/TopTitle"
import { DashboardStats } from "../../components/admin/molecules/DashboardStats"
import { DashboardCharts } from "../../components/admin/molecules/DashboardCharts"
import NewTransactionForm from "./transactions/NewTransactionForm";

// Title hook
import { useDocumentTitle } from "../..//lib/hooks/useDocumentTitle";

const DashboardView = () => {
    // Title
    useDocumentTitle("Panel Principal - Track My Cash")

    // New transaction form
    const [newTransactionForm, setNewTransactionForm] = useState(false)
    const formRef = useRef<HTMLFormElement>(null);

    return (
        <main className="content-page--admin">
            <TopViewModule
                title="Panel Principal"
                icon={DashboardIcon}
                txtBtnAdd="Registrar movimiento"
                txtBtnAddShort="Registrar"
                btnAddOnClick={() => setNewTransactionForm(true)}
                quickState1Value={""}
                quickState2Value={""}
                quickState3Value={""}
            />
            <h2 className="welcome-message">
                ¡Bienvenido de vuelta! Aquí está tu resumen financiero.
            </h2>
            <DashboardStats />
            <DashboardCharts />
            
            {newTransactionForm === true &&
                <NewTransactionForm
                    modalRef={formRef}
                    onClose={() => setNewTransactionForm(false)}
                />
            }
        </main>
    )
}

export default DashboardView