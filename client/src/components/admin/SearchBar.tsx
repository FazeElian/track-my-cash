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
                        id=""
                        defaultValue={0}
                    >
                        <option value="" key="">Todas las categorías</option>
                        <option value="" key="">Ingresos</option>
                        <option value="" key="">Gastos</option>
                    </select>
                </div>
            </div>
        </section>
    )
}

export { SearchBar };