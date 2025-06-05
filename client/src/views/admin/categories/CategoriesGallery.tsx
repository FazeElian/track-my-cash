// Styles for this component
import "../../../assets/css/components/admin/CategoriesGallery.css";

// Type
import type { Category } from '../../../lib/types/services/category.type';

// Card component
import { CategoryCard } from '../../../components/admin/molecules/CategoryCard';
import { useFetchAllCategories } from "../../../services/categories/queries";

interface GalleryProps {
    setEditForm: (id: number) => void;
}

const CategoriesGallery = ({ setEditForm } : GalleryProps) => {
    // Get categories
    const { data: categories } = useFetchAllCategories()

    // Si `data` es `undefined` o un array vacío después de que la carga ha terminado y no hubo error
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