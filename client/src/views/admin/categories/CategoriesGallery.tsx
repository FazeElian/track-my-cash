// Styles for this component
import "../../../assets/css/components/admin/CategoriesGallery.css";

// Type
import type { Category } from '../../../lib/types/services/category.type';

// Card component
import { CategoryCard } from '../../../components/admin/molecules/CategoryCard';
import { ModuleLoading } from "../../../components/admin/ModuleLoading";

interface GalleryProps {
    setEditForm: (id: number) => void;
    categories: Category[];
    loadingState: boolean
    searchQueryValue: string
}

const CategoriesGallery = ({ setEditForm, categories, loadingState, searchQueryValue } : GalleryProps) => {
    // If is loading
    if (loadingState == true) return <ModuleLoading />

    // If categories doesn't have items or is not an []
    const hasCategories = Array.isArray(categories) && categories.length > 0;
    if (!hasCategories) {
        if (searchQueryValue.trim() !== "") {
            return (
                <div className="no-data">
                    No hay categorías que coincidan con "{searchQueryValue}"
                </div>
            );
        } else {
            return (
                <div className="no-data">
                    Aún no has añadido ninguna categoría.
                </div>
            );
        }
    }

    // Categories that match with the search query
    const filteredCategories = categories.filter((category) =>
        category.name.toLowerCase().includes(searchQueryValue.toLowerCase())
    );

    // If there's no results
    if(filteredCategories.length <= 0) {
        return (
            <div className="no-data">
                No hay categorías que coincidan con "{searchQueryValue}"
            </div>
        );
    }

    return (
        <section className="categories-gallery">
            {filteredCategories.map((category: Category) => (
                <CategoryCard
                    key={category.id}
                    id={category.id}
                    name={category.name}
                    type={category.type}
                    icon={category.icon}
                    color={category.color}
                    monthlyBudget={category.monthlyBudget}
                    editForm={setEditForm}
                />
            ))}
        </section>
    )
}

export { CategoriesGallery };