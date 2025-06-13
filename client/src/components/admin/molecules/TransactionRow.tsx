import { toast } from 'sonner';

// React icons
import { FaCheckCircle } from "react-icons/fa";
import { MdOutlineDeleteOutline, MdOutlineWatchLater, MdOutlineArrowOutward } from "react-icons/md";
import { BiEdit } from "react-icons/bi";

// Type
import type { Transaction } from "../../../lib/types/services/transaction.type";

// Utils
import { formatDate } from "../../../lib/utils/formatDate";

// Delete mutation
import { useDeleteTransactionMutation } from "../../../services/transactions/mutations";

const TransactionRow : React.FC<Transaction> = (props) => {
    // Delete mutation
    const deleteTransactionMutation = useDeleteTransactionMutation()
    const handleDeleteTransaction  = (id: number) => {
        toast.warning(`¿Seguro que quieres eliminar este movimiento: "${props.title}"?`, {
            action: (
                <button
                    onClick={() => {
                        deleteTransactionMutation.mutate(id)
                        toast.dismiss();
                    }}
                    className="font-lexend btn-confirm-delete"
                >
                    Eliminar
                </button>
            ),
        });
    }

    return (
        <tr className="tbody tbody-categories" key={props.id}>
            {props.type == "Income" ? (
                <td className="td td-title-transaction">
                    <div className="icon-title-transaction icon-income-title-transaction">
                        <MdOutlineArrowOutward />
                    </div>
                    {props.title}
                </td>
            ): (
                <td className="td td-title-transaction">
                    <div className="icon-title-transaction icon-expense-title-transaction">
                        <MdOutlineArrowOutward />
                    </div>
                    {props.title}
                </td>
            )}
            {props.goalId ? (
                <td className="td td-goal-transaction">
                    {props.goalId}
                </td>
            ) : (
                <td className="td td-goal-transaction td-goal-empty-transaction">
                    Ninguna
                </td>
            )}
            <td className="td td-td td-date-transaction">{formatDate(props.date)}</td>
            {props.type == "Income" ? (
                <td className="td td-amount-transaction amount-income">
                    +${props.amount}
                </td>
            ): (
                <td className="td td-amount-transaction amount-expense">
                    -${props.amount}
                </td>
            )}
            <td className="td td-state-transaction">
                {props.state === "Completed" ? (
                    <div className="state-transaction state-completed">
                        <FaCheckCircle />
                        Completada
                    </div>
                ):(
                    <div className="state-transaction state-pending">
                        <MdOutlineWatchLater />
                        Pendiente
                    </div>
                )}
            </td>
            <td className="td td-options-transaction">
                <button
                    type="button"
                    className="btn-td btn-td-edit"
                    onClick={() => props.editForm(props.id)}
                >
                    <BiEdit />
                </button>
                <button
                    type="button"
                    className="btn-td btn-td-delete"
                    onClick={() => handleDeleteTransaction(props.id)}
                >
                    <MdOutlineDeleteOutline />
                </button>
            </td>
        </tr>
    )
}

export { TransactionRow };