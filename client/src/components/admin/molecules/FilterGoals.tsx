// Type
import type { FilterType } from "../../../lib/types/filter.type";

const FilterGoals : React.FC<FilterType> = ({ filter, setFilter }) => {
    return (
        <div className="filter">
            <select
                className="font-lexend"
                id="filter-categories"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
            >
                <option value="All" key="All">Todas mis metas</option>
                <option value="Completed" key="Completed">Completadas</option>
                <option value="InProgress" key="InProgress">En Progreso</option>
                <option value="Expired" key="Expired">Expiradas</option>
            </select>
        </div>
    )
}

export { FilterGoals };