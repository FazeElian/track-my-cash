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
    searchQueryValue: string
}

const GoalsGallery = ({ goals, loadingState, searchQueryValue, setEditForm } : GoalsGalleryProps) => {
    // If is loading
    if (loadingState == true) return <ModuleLoading />

    // If goals doesn't have items or is not an []
    const hasGoals = Array.isArray(goals) && goals.length > 0;
    if (!hasGoals) {
        if (searchQueryValue.trim() !== "") {
            return (
                <div className="no-data">
                    No hay movimientos que coincidan con "{searchQueryValue}"
                </div>
            );
        } else {
            return (
                <div className="no-data">
                    Aún no has registrado ningún movimiento.
                </div>
            );
        }
    }

    // goals that match with the search query
    const filteredGoals = goals.filter((goal) =>
        goal.title.toLowerCase().includes(searchQueryValue.toLowerCase())
    );

    // If there's no results
    if(filteredGoals.length <= 0) {
        return (
            <div className="no-data">
                No hay movimientos que coincidan con "{searchQueryValue}"
            </div>
        );
    }

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