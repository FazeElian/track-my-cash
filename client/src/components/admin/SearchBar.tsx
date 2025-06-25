import { useState } from "react";

// Styles for this component
import "../../assets/css/components/admin/SearchBar.css";

// Type
import type { SearchBarType } from "../../lib/types/search-bar.type"

// React icons
import { IoSearch } from "react-icons/io5";

// Filter component
import { FilterTransactions } from "./molecules/FilterTransactions";
import { FilterGoals } from "./molecules/FilterGoals";

const SearchBar : React.FC<SearchBarType> = (props) => {
    const [searchQuery, setSearchQuery] = useState("");

    const handleSearchSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        props.onSearchSubmit(searchQuery);
    };

    return (
        <section className="search-section">
            <h1>Buscar y filtrar {props.titleModule}</h1>
            <div className="search-bar">
                <form
                    className="search"
                    method="POST"
                    onSubmit={handleSearchSubmit}
                >
                    <IoSearch />
                    <input
                        className="font-lexend"
                        value={searchQuery}
                        id={props.searchName}
                        name={props.searchName}
                        type="text"
                        placeholder={props.placeholder}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </form>
                {props.module === "Transactions" ? (
                    <FilterTransactions filter={props.filter} setFilter={props.setFilter} />
                ) : (
                    <FilterGoals filter={props.filter} setFilter={props.setFilter} />
                )}
            </div>
        </section>
    )
}

export { SearchBar };