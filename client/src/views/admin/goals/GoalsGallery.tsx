// Styles for this component
import "../../../assets/css/components/admin/GoalsGallery.css";

// Components for this view
import { GoalCard } from "../../../components/admin/molecules/GoalCard";
import { ModuleLoading } from "../../../components/admin/ModuleLoading";

// Type
import type { Goal } from "../../../lib/types/services/goal.type";

interface GoalsGalleryProps {
    setEditForm: (id: number) => void;
    goals: Goal[];
    loadingState: boolean
    // searchQueryValue: string
}

const GoalsGallery = ({ setEditForm, goals, loadingState } : GoalsGalleryProps) => {
    // If is loading
    if (loadingState == true) return <ModuleLoading />

    return (
        <section className="goals-gallery">
            {goals.map((goal) => (
                <GoalCard
                    key={goal.id}
                    id={goal.id}
                    title={goal.title}
                    description={goal.description}
                    currentAmount={goal.currentAmount}
                    targetAmount={goal.targetAmount}
                    deadline={goal.deadline}
                    category={goal.category}
                    priorityLevel={goal.priorityLevel}
                    color={goal.color}
                    state={goal.state}
                    editForm={setEditForm}
                />
            ))}
        </section>
    )
}

export { GoalsGallery };