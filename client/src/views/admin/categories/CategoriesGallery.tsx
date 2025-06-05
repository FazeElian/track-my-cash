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
}

const CategoriesGallery = ({ setEditForm, categories, loadingState } : GalleryProps) => {
    // If is loading
    if (loadingState == true) return <ModuleLoading />

    // If categories doesn't have items or is not an []
    if (!Array.isArray(categories) || categories.length === 0) {
        return (
            <div className="no-data">
                Aún no has añadido ninguna categoría.
            </div>
        );
    }

    return (
        <section className="categories-gallery">
            {categories.map((category: Category) => (
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