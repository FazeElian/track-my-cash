import { useEffect, useRef, useState } from "react"

// Components for this view
import { TopViewModule } from "../../../components/admin/TopTitle"
import { SearchBar } from "../../../components/admin/SearchBar"
import NewTransactionForm from "./NewTransactionForm"
import EditTransactionForm from "./EditTransactionForm"

// React icons
import { IoMdSwap } from "react-icons/io"
import { TransactionsTable } from "./TransactionsTable"

// Query
import { useFetchAllTransactions } from "../../../services/transactions/queries"

const TransactionsView = () => {
    const [modalForm, setModalForm] = useState<"new" | `edit ${number}` | null>(null);
    const [editTransactionId, setEditTransactionId] = useState<number | null>(null);
    const formRef = useRef<HTMLFormElement>(null);
    const [searchQuery, setSearchQuery] = useState("");

    const handleSearchSubmit = (value: string) => {
        value = value.toLowerCase()
        setSearchQuery(value);
    };

    // Get transactions list
    const { data: transactions, isLoading } = useFetchAllTransactions()

    // Filter transactions
    const totalTransactions = Array.isArray(transactions) ? transactions.length : 0;
    const totalCompleted = Array.isArray(transactions)
        ? transactions.filter((category) => category.state === "Completed").length
        : 0;
    const totalPending = Array.isArray(transactions)
        ? transactions.filter((category) => category.state === "Pending").length
        : 0;

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

    let loadingState = false

    // If is loading
    if (isLoading) {
        loadingState = true
    }

    // Handle edit form
    const handleEditForm = (id: number) => {
        setEditTransactionId(id);
        setModalForm(`edit ${id}`);
    };

    const transactionsList =  Array.isArray(transactions)
        ? transactions.filter(transaction =>
            transaction.title.toLowerCase().includes(searchQuery)
        ) : []

    return (
        <main className="content-page--admin">
            <TopViewModule
                title="Mis Movimientos"
                icon={IoMdSwap}
                txtBtnAdd="Registrar movimiento"
                txtBtnAddShort="Registrar"
                btnAddOnClick={() => setModalForm("new")}
                quickState1Value={`${totalTransactions} movimientos registrados`}
                quickState2Value={`${totalCompleted} completados`}
                quickState3Value={`${totalPending} pendientes`}
                onSearchSubmit={handleSearchSubmit}

            />
            <SearchBar
                titleModule="Movimientos"
                searchName="transactions"
                placeholder="Buscar movimiento por título"
                onSearchSubmit={handleSearchSubmit}
            />
            <TransactionsTable
                setEditForm={handleEditForm}
                transactions={transactionsList}
                loadingState={loadingState}
                searchQueryValue={searchQuery}
            />

            {/* Modal form */}
            {modalForm === "new" && 
                <NewTransactionForm
                    modalRef={formRef}
                    onClose={() => setModalForm(null)}
                />
            }

            {modalForm === `edit ${editTransactionId}` && editTransactionId !== null && ( 
                <EditTransactionForm
                    id={editTransactionId}
                    modalRef={formRef}
                    onClose={() => setModalForm(null)}
                />
            )}
        </main>
    )
}

export default TransactionsView