import { useEffect, useRef, useState } from "react"

// Components for this view
import { TopViewModule } from "../../../components/admin/TopTitle"
import { SearchBar } from "../../../components/admin/SearchBar"

// React icons
import { IoMdSwap } from "react-icons/io"
import { TransactionsTable } from "./TransactionsTable"
import NewTransactionForm from "./NewTransactionForm"

const TransactionsView = () => {
    const [modalForm, setModalForm] = useState<"new" | `edit ${number}` | null>(null);
    const formRef = useRef<HTMLFormElement>(null);

    // Close the modal when user clicks outside the form
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (formRef.current && !formRef.current.contains(event.target as Node)) {
                setModalForm(null);
            }
        };

        if (modalForm) {
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
    }, [modalForm]);

    return (
        <main className="content-page--admin">
            <TopViewModule
                title="Mis Movimientos"
                icon={IoMdSwap}
                txtBtnAdd="Registrar movimiento"
                txtBtnAddShort="Registrar"
                btnAddOnClick={() => setModalForm("new")}
                quickState1Value={`${12} movimientos registrador`}
                quickState2Value={`${4} de ingresos`}
                quickState3Value={`${8} de gastos`}
            />
            <SearchBar
                titleModule="Movimientos"
                searchName="transactions"
                placeholder="Buscar movimiento por título"
            />
            <TransactionsTable />
            {/* Modal form */}
            {modalForm === "new" && 
                <NewTransactionForm
                    modalRef={formRef}
                    onClose={() => setModalForm(null)}
                />
            }
        </main>
    )
}

export default TransactionsView