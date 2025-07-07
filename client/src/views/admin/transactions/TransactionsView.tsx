import { useRef, useState } from "react"

// Components for this view
import { TopViewModule } from "../../../components/admin/TopTitle"
import { SearchBar } from "../../../components/admin/SearchBar"
import NewTransactionForm from "./NewTransactionForm"
import EditTransactionForm from "./EditTransactionForm"
import { TransactionsTable } from "./TransactionsTable"

// Lucide react icons
import { MovementsIcon } from "../../../lib/lists/Icons"

// Query
import { useFetchAllTransactions } from "../../../services/transactions/queries"

// Hooks
import { useDocumentTitle } from "../../../lib/hooks/useDocumentTitle";
import { useHandleModalForm } from "../../../lib/hooks/useHandleModalForm"

const TransactionsView = () => {
    // Title
    useDocumentTitle("Movimientos - Track My Cash")

    const [editTransactionId, setEditTransactionId] = useState<number | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [filter, setFilter] = useState("All");

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

    // Modal form state & ref
    const [modalForm, setModalForm] = useState<"new" | `edit ${number}` | null>(null);
    const formRef = useRef<HTMLFormElement>(null) as React.RefObject<HTMLFormElement>;

    // Custom hook to handle modal form
    useHandleModalForm({
        modalForm,
        setModalForm,
        formRef
    });

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

    const transactionsList = Array.isArray(transactions)
        ? transactions
            .filter(transaction =>
                transaction.title.toLowerCase().includes(searchQuery)
            )
            .filter(transaction => {
                if (filter === "Income") {
                    return transaction.type === "Income";
                } 
                if (filter === "Expense") {
                    return transaction.type === "Expense";
                }
                if (filter === "Completed") {
                    return transaction.state === "Completed";
                }
                if (filter === "Pending") {
                    return transaction.state === "Pending";
                }
                return true; // "All"
            })
        : [];

    return (
        <main className="content-page--admin">
            <TopViewModule
                title="Mis Movimientos"
                icon={MovementsIcon}
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
                filter={filter}
                setFilter={setFilter}
                module="Transactions"
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