// Components for this view
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
        </main>
    )
}

export default CategoriesView