// Styles for this component
import "../../../assets/css/components/admin/MovementsTable.css";

// Components for this view
import { ModuleLoading } from "../../../components/admin/ModuleLoading";
import { TransactionRow } from "../../../components/admin/molecules/TransactionRow";

// Type
import type { Transaction } from "../../../lib/types/services/transaction.type";

interface TransactionsTableProps {
    // setEditForm: (id: number) => void;
    transactions: Transaction[];
    loadingState: boolean
    searchQueryValue: string
}

const TransactionsTable = ({ transactions, loadingState, searchQueryValue } : TransactionsTableProps) => {
    // If is loading
    if (loadingState == true) return <ModuleLoading />

    // If transactions doesn't have items or is not an []
    const hasTransactions = Array.isArray(transactions) && transactions.length > 0;
    if (!hasTransactions) {
        if (searchQueryValue.trim() !== "") {
            return (
                <div className="no-data">
                    No hay movimientos que coincidan con "{searchQueryValue}"
                </div>
            );
        } else {
            return (
                <div className="no-data">
                    Aún no has registrado ningún movimiento.
                </div>
            );
        }
    }

    // Transactions that match with the search query
    const filteredTransactions = transactions.filter((transaction) =>
        transaction.title.toLowerCase().includes(searchQueryValue.toLowerCase())
    );

    // If there's no results
    if(filteredTransactions.length <= 0) {
        return (
            <div className="no-data">
                No hay movimientos que coincidan con "{searchQueryValue}"
            </div>
        );
    }

    return (
        <table className="table-transactions">
            <thead>
                <tr className="thead-transactions thead">
                    <th className="tr tr-title-transaction">Movimiento</th>
                    <th className="tr tr-category-transaction">Categoría</th>
                    <th className="tr tr-date-transaction">Fecha</th>
                    <th className="tr tr-amount-transaction">Cantidad</th>
                    <th className="tr tr-state-transaction">Estado</th>
                    <th className="tr tr-options-transaction">Opciones</th>
                </tr>
            </thead>
            <tbody>
                {transactions.map((transaction) => (
                    <TransactionRow
                        key={transaction.id}
                        id={transaction.id}
                        title={transaction.title}
                        amount={transaction.amount}
                        type={transaction.type}
                        categoryId={transaction.categoryId}
                        date={transaction.date}
                        state={transaction.state}
                        notes={transaction.notes}
                        editForm={() => console.log()}
                    />
                ))}
            </tbody>
            <tbody>
            </tbody>
        </table>
    )
}

export { TransactionsTable };