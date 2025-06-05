// React icons
import { FaCheckCircle } from "react-icons/fa";
import { MdOutlineDeleteOutline, MdOutlineWatchLater } from "react-icons/md";
import { BiEdit } from "react-icons/bi";

// Type
import type { Transaction } from "../../../lib/types/services/transaction.type";

// Utils
import { formatDate } from "../../../lib/utils/dateFormat";
import { useGetCategoryById } from "../../../services/categories/queries";

const TransactionRow : React.FC<Transaction> = (props) => {
    const { data: category, isLoading } = useGetCategoryById(props.categoryId)
    let categoryName = category?.name

    if (isLoading) {
        categoryName = "Cargando..."
    }

    return (
        <tr className="tbody tbody-categories" key={props.id}>
            <td className="td td-title-transaction">{props.title}</td>
            <td className="td td-category-transaction">{categoryName}</td>
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
                <button className="btn-td btn-td-edit">
                    <BiEdit />
                </button>
                <button className="btn-td btn-td-delete">
                    <MdOutlineDeleteOutline />
                </button>
            </td>
        </tr>
    )
}

export { TransactionRow };