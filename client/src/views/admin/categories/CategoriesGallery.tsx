// Styles for this component
import "../../../assets/css/components/admin/CategoriesGallery.css";

// Query
import { useGetAllCategories } from '../../../services/categories/queries';

// Type
import type { Category } from '../../../lib/types/services/category.type';

// Card component
import { CategoryCard } from '../../../components/admin/molecules/CategoryCard';

const CategoriesGallery = () => {
    // Categories list from query
    const categories = useGetAllCategories()

    // Check if it's an array
    if (!Array.isArray(categories)) {
        return null;
    }

    // Check if it has categories
    if (categories.length === 0) {
        return (
            <div className="no-data">
                Aún no has añadido ninguna categoría.
            </div>
        )
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
                />
            ))}
        </section>
    )
}

export { CategoriesGallery };