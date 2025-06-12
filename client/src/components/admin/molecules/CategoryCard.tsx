import { motion } from 'framer-motion';
import { toast } from 'sonner';

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

// Utils
import { truncateText } from '../../../lib/utils/truncateText';

const CategoryCard : React.FC<Category> = (props) => {
    // Delete mutation
    const deleteCategoryMutation = useDeleteCategoryMutation()
    const handleDeleteCategory  = (id: number) => {
        toast.warning(`¿Seguro que quieres eliminar esta categoría: "${props.name}"?`, {
            action: (
                <button
                    onClick={() => {
                        deleteCategoryMutation.mutate(id)
                        toast.dismiss();
                    }}
                    className="font-lexend btn-confirm-delete"
                >
                    Eliminar
                </button>
            ),
        });
    }
    const IconComponent = iconsMap[props.icon];

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
                    {IconComponent ? <IconComponent /> : <IoMdCart />}
                </div>
                <div className="info-top-item-categories-gallery">
                    <h1>{props.name}</h1>
                    <div className="type-top-item-categories-gallery">
                        {props.type === "Expense" ? "Gasto" : "Ingreso"}
                    </div>
                </div>
                <button
                    type="button"
                    className="btn-options-top-item-categories-gallery btn-edit-top-item-categories-gallery"
                    onClick={() => props.editForm(props.id)}
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
                {props.description ? (
                    <p className="category-description">
                        {truncateText(props.description, 90)}
                    </p>
                ) : (
                    <p className="category-description category-description-empty">
                        Sin descripción
                    </p>
                )}
        </motion.div>
    )
}

export { CategoryCard };