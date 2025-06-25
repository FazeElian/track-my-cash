// Type
import type { FilterType } from "../../../lib/types/filter.type";

const FilterTransactions : React.FC<FilterType> = ({ filter, setFilter }) => {
    return (
        <div className="filter">
            <select
                className="font-lexend"
                id="filter-categories"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
            >
                <option value="All" key="All">Todos mis movimientos</option>
                <option value="Income" key="Income">De ingresos</option>
                <option value="Expense" key="Expense">De gastos</option>
                <option value="Completed" key="Completed">Completados</option>
                <option value="Pending" key="Pending">Pendientes</option>
            </select>
        </div>
    )
}

export { FilterTransactions };