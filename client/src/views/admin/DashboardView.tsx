import { useEffect, useRef, useState } from "react";

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

    // Close the modal when user clicks outside the form
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (formRef.current && !formRef.current.contains(event.target as Node)) {
                setNewTransactionForm(false);
            }
        };

        if (newTransactionForm) {
            document.addEventListener("mousedown", handleClickOutside);

            // Remove scroll on body
            document.body.classList.add("no-scroll");
            return () => document.body.classList.remove("no-scroll");
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [newTransactionForm]);

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