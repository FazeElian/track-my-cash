import { motion } from 'framer-motion';
import { toast } from 'sonner';

// React icons
import { WiTime4 } from "react-icons/wi";
import { TbPointFilled } from 'react-icons/tb';
import { BiEdit } from 'react-icons/bi';
import { MdOutlineDeleteOutline } from 'react-icons/md';

// Utils
import { truncateText } from "../../../lib/utils/truncateText";
import { formatAmount } from '../../../lib/utils/formatAmount';

// Lists
import { barColorClassMap, colorClassMap } from '../../../lib/lists/Colors';
import { categoriesMap } from '../../../lib/lists/Categories';

// Type
import type { Goal } from '../../../lib/types/services/goal.type';

// Delete mutation
import { useDeleteGoalMutation } from '../../../services/goals/mutations';

const GoalCard : React.FC<Goal> = (props) => {
    // Calc % for progress
    const progressPercentage = ((props.currentAmount / props.targetAmount) * 100).toFixed(1).replace(".", ".")
    const IconComponent = categoriesMap[props.category];

    // Delete mutation
    const deleteGoalMutation = useDeleteGoalMutation()
    const handleDeleteGoal  = (id: number) => {
        toast.warning(`¿Seguro que quieres eliminar esta meta?: "${props.title}"?`, {
            action: (
                <button
                    onClick={() => {
                        deleteGoalMutation.mutate(id)
                        toast.dismiss();
                    }}
                    className="font-lexend btn-confirm-delete"
                >
                    Eliminar
                </button>
            ),
        });
    }

    return (
        <motion.div
            className="item-goals-gallery"
            key={props.id}
            whileHover={{ scale: 1.05 }}
            transition={{
                duration: .25,
            }}
        >
            <div className="top-item-goals-gallery">
                <div
                    className={`icon-top-item-goals-gallery ${colorClassMap[props.color]}`}
                >
                   <IconComponent />
                </div>
                <div className="info-top-item-goals-gallery">
                    <h1>{props.title}</h1>
                    {props.priorityLevel === "High" ? (
                        <div className="priority-top-item-goals-gallery high-priority-top-item-goals-gallery">
                            <TbPointFilled />
                            Alta
                        </div>
                    ) : props.priorityLevel === "Medium" ? (
                        <div className="priority-top-item-goals-gallery mid-priority-top-item-goals-gallery">
                            <TbPointFilled />
                            Media
                        </div>
                    ) : (
                        <div className="priority-top-item-goals-gallery low-priority-top-item-goals-gallery">
                            <TbPointFilled />
                            Baja
                        </div>
                    )}
                </div>
                <button
                    type="button"
                    className="btn-options-top-item-goals-gallery btn-edit-top-item-goals-gallery"
                >
                    <BiEdit />
                </button>
                <button
                    type="button"
                    className="btn-options-top-item-goals-gallery btn-delete-top-item-goals-gallery"
                    onClick={() => handleDeleteGoal(props.id)}
                >
                    <MdOutlineDeleteOutline />
                </button>
            </div>
            <ul className="center-item-goals-gallery">
                <p className="goal-description">
                    {props.description ? (
                        truncateText(props.description, 90)
                    ) : (
                        "Sin descripción"
                    )}
                </p>
                <li className="item-center-item-goals-gallery">
                    <h2>Progreso</h2>
                    <h3>{progressPercentage}%</h3>
                </li>
                <div className="goal-progress-bar">
                    <div className={`goal-progress ${barColorClassMap[props.color]}`} style={{ width: `${progressPercentage}%` }} />
                </div>
                <li className="item-center-item-goals-gallery">
                    <h2>{formatAmount(props.currentAmount)}</h2>
                    <h3>{formatAmount(props.targetAmount)}</h3>
                </li>
            </ul>
            <div className="btm-item-goals-gallery">
                <div className="item-btm-item-goals-gallery">
                    <h2>
                        <b>Categoría:</b>
                        {props.category}
                    </h2>
                </div>
                <div className="item-btm-item-goals-gallery item-time-btm-item-goals-gallery">
                    <WiTime4 />
                    <h2>
                        3 meses
                    </h2>
                </div>
            </div>
        </motion.div>
    )
}

export { GoalCard };