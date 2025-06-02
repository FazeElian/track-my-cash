import { motion } from 'framer-motion';

// Styles for this component
import "../../../assets/css/components/admin/CategoriesGallery.css";

// React icons
import { MdOutlineDeleteOutline } from "react-icons/md";
import { IoMdCart } from "react-icons/io";
import { BiEdit } from "react-icons/bi";

// Query
import { useGetAllCategories } from '../../../services/categories/queries';

// Type
import type { Category } from '../../../lib/types/services/category.type';

// Lists
import { iconsMap } from '../../../lib/lists/Icons';
import { colorClassMap } from '../../../lib/lists/Colors';

// Delete mutation
import { useDeleteCategoryMutation } from '../../../services/categories/mutations';

const CategoriesGallery = () => {
    // Delete mutation
    const deleteCategoryMutation = useDeleteCategoryMutation()
    const handleDeleteCategory  = (id: number) => {
        deleteCategoryMutation.mutate(id)
    }

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
                <motion.div
                    className="item-categories-gallery"
                    key={category.id}
                    whileHover={{ scale: 1.05 }}
                    transition={{
                        duration: .25,
                    }}
                >
                    <div className="top-item-categories-gallery">
                        <div
                            className={`icon-top-item-categories-gallery ${colorClassMap[category.color]}`}
                        >
                            {(() => {
                                const Icon = iconsMap[category.icon];
                                return Icon ? <Icon /> : <IoMdCart />;
                            })()}
                        </div>
                        <div className="info-top-item-categories-gallery">
                            <h1>{category.name}</h1>
                            <div className="type-top-item-categories-gallery">
                                {category.type === "Expense" ? "Gasto" : "Ingreso"}
                            </div>
                        </div>
                        <button
                            type="button"
                            className="btn-options-top-item-categories-gallery btn-edit-top-item-categories-gallery "
                        >
                            <BiEdit />
                        </button>
                        <button
                            type="button"
                            className="btn-options-top-item-categories-gallery btn-delete-top-item-categories-gallery"
                            onClick={() => handleDeleteCategory(category.id)}
                        >
                            <MdOutlineDeleteOutline />
                        </button>
                    </div>
                    <div className="txt-top-item-categories-gallery">
                        <li className="item-txt-top-item-categories-gallery">
                            <h2>Transacciones</h2>
                            <h3>0</h3>
                        </li>
                        <li className="item-txt-top-item-categories-gallery">
                            <h2>Presupuesto</h2>
                            <h3>$ {category.monthlyBudget}</h3>
                        </li>
                        <li className="item-txt-top-item-categories-gallery">
                            <h2>Gastado</h2>
                            <h3>$ 0</h3>
                        </li>
                    </div>
                </motion.div>
            ))}
        </section>
    )
}

export { CategoriesGallery };