import { useEffect, useRef, useState } from "react";

// Components for this view
import { SearchBar } from "../../../components/admin/SearchBar";
import { TopViewModule } from "../../../components/admin/TopTitle"
import { CategoriesGallery } from "./CategoriesGallery";

// React icons
import { BiCategoryAlt } from "react-icons/bi";
import NewCategoryForm from "./NewCategoryForm";

// Query
import { useGetAllCategories } from "../../../services/categories/queries";

const CategoriesView = () => {
    const [isOpen, setIsOpen] = useState(false);
    const formRef = useRef<HTMLFormElement>(null);

    // Get all categories
    const categories = useGetAllCategories()

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
                setIsOpen(false);
            }
        };

        if (isOpen) {
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
    }, [isOpen]);

    return (
        <main className="content-page--admin">
            <TopViewModule
                title="Gestión de categorías"
                icon={BiCategoryAlt}
                txtBtnAdd="Añadir categoría"
                txtBtnAddShort="Añadir"
                btnAddOnClick={() => setIsOpen(true)}
                quickState1Value={`${totalCategories} categorías creadas`}
                quickState2Value={`${totalIncomes} de ingresos`}
                quickState3Value={`${totalExpenses} de gastos`}
            />
            <SearchBar
                titleModule="Categorías"
                searchName="categories"
                placeholder="Buscar categoría por nombre"
            />
            <CategoriesGallery />

            {/* Modal form */}
            {isOpen && 
                <NewCategoryForm
                    modalRef={formRef}
                    onClose={() => setIsOpen(false)}
                />
            }
        </main>
    )
    
}

export default CategoriesView