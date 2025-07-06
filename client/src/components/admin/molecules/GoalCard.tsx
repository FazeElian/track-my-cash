import { motion } from 'framer-motion';
import { toast } from 'sonner';

// React icons
import {
    EditIcon,
    DeleteIcon,
    RetryIcon,
    SadFaceIcon,
    PendingIcon,
    CheckIcon,
    DotIcon
} from "../../../lib/lists/Icons";


// Utils
import { truncateText } from "../../../lib/utils/truncateText";
import { formatAmount } from '../../../lib/utils/formatAmount';

// Lists
import { barColorClassMap, colorClassMap } from '../../../lib/lists/Colors';
import { categoriesMap } from '../../../lib/lists/Categories';

// Type
import type { Goal } from '../../../lib/types/services/goal.type';

// Delete mutation
import { useDeleteGoalMutation, useReActivateGoalMutation } from '../../../services/goals/mutations';
import { formatDueDate } from '../../../lib/utils/formatDueDate';

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

    // Re activate mutation
    const reActivateMutation = useReActivateGoalMutation()
    const handleGoalReactivation = (id: number) => {
        reActivateMutation.mutate(id)
    }

    return (
        <motion.div
            className={`item-goals-gallery
                ${props.state === "Completed" ? "item-completed-goals-gallery"
                    : props.state === "Expired" ? "item-expired-goals-gallery"
                    : ""
                }
            `}
            key={props.id}
            whileHover={{ scale: 1.05 }}
            transition={{
                duration: .25,
            }}
        >
            {props.state === "Completed" ? (
                <div
                    className="txt-completed-item-completed-goals-gallery txt-completed-item-completed-goals-gallery-visible">
                    <CheckIcon />
                    <br/>
                    Completada!
                </div>
            ) : props.state === "Expired" ? (
                <div
                    className="txt-expired-item-expired-goals-gallery txt-expired-item-expired-goals-gallery-visible">
                    <SadFaceIcon />
                    <br/>
                    Meta vencida sin completar
                    <button
                        type="button"
                        onClick={() => handleGoalReactivation(props.id)}
                        className="btn-expired-item-expired-goals-gallery font-lexend"
                    >
                        <RetryIcon strokeWidth={2.5} />
                        Reactivar meta
                    </button>
                </div>
            ) : ("")}

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
                            <DotIcon />
                            Alta
                        </div>
                    ) : props.priorityLevel === "Medium" ? (
                        <div className="priority-top-item-goals-gallery mid-priority-top-item-goals-gallery">
                            <DotIcon />
                            Media
                        </div>
                    ) : (
                        <div className="priority-top-item-goals-gallery low-priority-top-item-goals-gallery">
                            <DotIcon />
                            Baja
                        </div>
                    )}
                </div>
                <button
                    type="button"
                    className="btn-options-top-item-goals-gallery btn-edit-top-item-goals-gallery"
                    onClick={() => props.editForm(props.id)}
                >
                    <EditIcon />
                </button>
                <button
                    type="button"
                    className="btn-options-top-item-goals-gallery btn-delete-top-item-goals-gallery"
                    onClick={() => handleDeleteGoal(props.id)}
                >
                    <DeleteIcon />
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
                    <PendingIcon />
                    <h2>
                        {formatDueDate(props.deadline)}
                    </h2>
                </div>
            </div>
        </motion.div>
    )
}

export { GoalCard };