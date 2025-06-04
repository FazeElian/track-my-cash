// Styles for this component
import "../../assets/css/components/admin/SearchBar.css";

// Type
import type { SearchBarType } from "../../lib/types/search-bar.type"

// React icons
import { IoSearch } from "react-icons/io5";

const SearchBar : React.FC<SearchBarType> = (props) => {
    return (
        <section className="search-section">
            <h1>Buscar y filtrar {props.titleModule}</h1>
            <div className="search-bar">
                <div className="search">
                    <IoSearch />
                    <input
                        className="font-lexend"
                        id={props.searchName}
                        name={props.searchName}
                        type="text"
                        placeholder={props.placeholder}
                    />
                </div>
                <div className="filter">
                    <select
                        className="font-lexend"
                        id="filter-categories"
                        defaultValue={0}
                    >
                        <option value="All" key="All">Todas las categorías</option>
                        <option value="Incomes" key="Incomes">Ingresos</option>
                        <option value="Expenses" key="Expenses">Gastos</option>
                    </select>
                </div>
            </div>
        </section>
    )
}

export { SearchBar };