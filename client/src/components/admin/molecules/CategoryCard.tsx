import { motion } from 'framer-motion';

// Type
import type { Category } from "../../../lib/types/services/category.type";

// React icons
import { IoMdCart } from 'react-icons/io';
import { MdOutlineDeleteOutline } from 'react-icons/md';
import { BiEdit } from 'react-icons/bi';

// Lists
import { iconsMap } from '../../../lib/lists/Icons';
import { colorClassMap } from '../../../lib/lists/Colors';

// Delete mutation
import { useDeleteCategoryMutation } from '../../../services/categories/mutations';

const CategoryCard : React.FC<Category> = (props) => {
    // Delete mutation
    const deleteCategoryMutation = useDeleteCategoryMutation()
    const handleDeleteCategory  = (id: number) => {
        deleteCategoryMutation.mutate(id)
    }

    return (
        <motion.div
            className="item-categories-gallery"
            key={props.id}
            whileHover={{ scale: 1.05 }}
            transition={{
                duration: .25,
            }}
        >
            <div className="top-item-categories-gallery">
                <div
                    className={`icon-top-item-categories-gallery ${colorClassMap[props.color]}`}
                >
                    {(() => {
                        const Icon = iconsMap[props.icon];
                        return Icon ? <Icon /> : <IoMdCart />;
                    })()}
                </div>
                <div className="info-top-item-categories-gallery">
                    <h1>{props.name}</h1>
                    <div className="type-top-item-categories-gallery">
                        {props.type === "Expense" ? "Gasto" : "Ingreso"}
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
                    onClick={() => handleDeleteCategory(props.id)}
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
                    <h3>$ {props.monthlyBudget}</h3>
                </li>
                <li className="item-txt-top-item-categories-gallery">
                    <h2>Gastado</h2>
                    <h3>$ 0</h3>
                </li>
            </div>
        </motion.div>
    )
}

export { CategoryCard };