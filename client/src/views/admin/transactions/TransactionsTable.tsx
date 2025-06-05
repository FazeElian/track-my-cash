// Styles for this component
import "../../../assets/css/components/admin/MovementsTable.css";

// React icons
import { MdOutlineDeleteOutline, MdOutlineWatchLater } from 'react-icons/md';
import { BiEdit } from 'react-icons/bi';
import { MdOutlineCheckCircle } from "react-icons/md";

const TransactionsTable = () => {
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
                <tr className="tbody tbody-categories">
                    <td className="td td-title-transaction">Renta AirBnb Miami, Florida</td>
                    <td className="td td-category-transaction">Rentas</td>
                    <td className="td td-td td-date-transaction">2024-01-15</td>
                    <td className="td td-amount-transaction amount-income">+$35000.00</td>
                    <td className="td td-state-transaction">
                        {/* <div className="state-transaction state-completed">
                            <FaCheckCircle />
                            Completada
                        </div> */}
                        <div className="state-transaction state-pending">
                            <MdOutlineWatchLater />
                            Pendiente
                        </div>
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
            </tbody>
            <tbody>
                <tr className="tbody tbody-categories">
                    <td className="td td-title-transaction">Renta AirBnb Dubai </td>
                    <td className="td td-category-transaction">Rentas</td>
                    <td className="td td-td td-date-transaction">2024-01-15</td>
                    <td className="td td-amount-transaction amount-expense">-$25000.00</td>
                    <td className="td td-state-transaction">
                        <div className="state-transaction state-completed">
                            <MdOutlineCheckCircle />
                            Completada
                        </div>
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
            </tbody>
        </table>
    )
}

export { TransactionsTable };