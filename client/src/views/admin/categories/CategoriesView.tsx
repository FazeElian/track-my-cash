import { useEffect, useRef, useState } from "react";

// Components for this view
import { SearchBar } from "../../../components/admin/SearchBar";
import { TopViewModule } from "../../../components/admin/TopTitle"
import { CategoriesGallery } from "./CategoriesGallery";
import EditCategoryForm from "./EditCategoryForm";
import NewCategoryForm from "./NewCategoryForm";

// React icons
import { BiCategoryAlt } from "react-icons/bi";

// Query
import { useFetchAllCategories } from "../../../services/categories/queries";

const CategoriesView = () => {
    const [modalForm, setModalForm] = useState<"new" | `edit ${number}` | null>(null);
    const [editCategoryId, setEditCategoryId] = useState<number | null>(null);
    const formRef = useRef<HTMLFormElement>(null);

    // Get all categories
    const { data: categories, isLoading } = useFetchAllCategories()

    // Filter categories
    const totalCategories = Array.isArray(categories) ? categories.length : 0;
    const totalExpenses = Array.isArray(categories)
        ? categories.filter((category) => category.type === "Expense").length
        : 0;
    const totalIncomes = Array.isArray(categories)
        ? categories.filter((category) => category.type === "Income").length
        : 0;

    // Close the modal when user clicks outside the form
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (formRef.current && !formRef.current.contains(event.target as Node)) {
                setModalForm(null);
            }
        };

        if (modalForm) {
            document.addEventListener("mousedown", handleClickOutside);

            // Remove scroll on body
            document.body.classList.add("no-scroll");
            return () => document.body.classList.remove("no-scroll");
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [modalForm]);

    let loadingState = false

    // If is loading
    if (isLoading) {
        loadingState = true
    }

    // Handle edit form
    const handleEditForm = (id: number) => {
        setEditCategoryId(id);
        setModalForm(`edit ${id}`);
    };

    return (
        <main className="content-page--admin">
            <TopViewModule
                title="Gestión de categorías"
                icon={BiCategoryAlt}
                txtBtnAdd="Añadir categoría"
                txtBtnAddShort="Añadir"
                btnAddOnClick={() => setModalForm("new")}
                quickState1Value={`${totalCategories} categorías creadas`}
                quickState2Value={`${totalIncomes} de ingresos`}
                quickState3Value={`${totalExpenses} de gastos`}
            />
            <SearchBar
                titleModule="Categorías"
                searchName="categories"
                placeholder="Buscar categoría por nombre"
            />
            <CategoriesGallery
                setEditForm={handleEditForm}
                categories={Array.isArray(categories) ? categories : []}
                loadingState={loadingState}
            />

            {/* Modal form */}
            {modalForm === "new" && 
                <NewCategoryForm
                    modalRef={formRef}
                    onClose={() => setModalForm(null)}
                />
            }

            {modalForm === `edit ${editCategoryId}` && editCategoryId !== null && (
                <EditCategoryForm
                    id={editCategoryId}
                    modalRef={formRef}
                    onClose={()  => setModalForm(null)}
                />
            )}
        </main>
    )
}

export default CategoriesView