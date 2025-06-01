// Components for this view
import { SearchBar } from "../../../components/admin/SearchBar";
import { TopViewModule } from "../../../components/admin/TopTitle"

// React icons
import { BiCategoryAlt } from "react-icons/bi";

const CategoriesView = () => {
    return (
        <main className="content-page--admin">
            <TopViewModule
                title="Gestión de categorías"
                icon={BiCategoryAlt}
                txtBtnAdd="Añadir categoría"
                txtBtnAddShort="Añadir"
            />
            <SearchBar
                titleModule="Categorías"
                searchName="categories"
                placeholder="Buscar categoría por nombre"
            />
        </main>
    )
}

export default CategoriesView