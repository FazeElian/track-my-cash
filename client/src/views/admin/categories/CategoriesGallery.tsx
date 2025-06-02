import { motion } from 'framer-motion';

// Styles for this component
import "../../../assets/css/components/admin/CategoriesGallery.css";

// React icons
import { MdOutlineMoreHoriz } from "react-icons/md";
import { IoMdCart } from "react-icons/io";

// Query
import { useGetAllCategories } from '../../../services/categories/queries';

// Type
import type { Category } from '../../../lib/types/services/category.type';

// Lists
import { iconsMap } from '../../../lib/lists/Icons';
import { colorClassMap } from '../../../lib/lists/Colors';

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
                <motion.div
                    className="item-categories-gallery"
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
                            className="btn-options-top-item-categories-gallery"
                        >
                            <MdOutlineMoreHoriz />
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