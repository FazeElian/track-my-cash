import { useRef, useState } from "react";

// Components for this view
import { SearchBar } from "../../../components/admin/SearchBar"
import { TopViewModule } from "../../../components/admin/TopTitle"
import { GoalsGallery } from "./GoalsGallery";
import { EditGoalForm } from "./EditGoalForm";
import NewGoalForm from "./NewGoalForm";

// React icons
import { GoalIcon } from "../../../lib/lists/Icons";

// Query
import { useFetchAllGoals } from "../../../services/goals/queries";

// Hooks
import { useDocumentTitle } from "../../../lib/hooks/useDocumentTitle";
import { useHandleModalForm } from "../../../lib/hooks/useHandleModalForm";

const GoalsView = () => {
    // Title
    useDocumentTitle("Metas - Track My Cash")

    const [editGoalId, setEditGoalId] = useState<number | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [filter, setFilter] = useState("All");

    const handleSearchSubmit = (value: string) => {
        value = value.toLowerCase()
        setSearchQuery(value);
    };

    // Get goals list
    const { data: goals, isLoading } = useFetchAllGoals()

    // Filter goals
    const totalGoals = Array.isArray(goals) ? goals.length : 0;
    const totalCompleted = Array.isArray(goals)
        ? goals.filter((goal) => goal.state === "Completed").length
        : 0;
    const totalExpired = Array.isArray(goals)
        ? goals.filter((goal) => goal.state === "Expired").length
        : 0;

    // Modal form state & ref
    const [modalForm, setModalForm] = useState<"new" | `edit ${number}` | null>(null);
    const formRef = useRef<HTMLFormElement>(null) as React.RefObject<HTMLFormElement>;

    // Custom hook to handle modal form
    useHandleModalForm({
        modalForm,
        setModalForm,
        formRef
    });

    let loadingState = false

    // If is loading
    if (isLoading) {
        loadingState = true
    }

    // Handle edit form
    const handleEditForm = (id: number) => {
        setEditGoalId(id);
        setModalForm(`edit ${id}`);
    };

    const goalsList =  Array.isArray(goals)
        ? goals.filter(goal =>
            goal.title.toLowerCase().includes(searchQuery)
        )
        .filter(goal => {
            if (filter === "Completed") {
                return goal.state === "Completed"
            }
            if (filter === "InProgress") {
                return goal.state === "InProgress"
            }
            if (filter === "Expired") {
                return goal.state === "Expired"
            }
            return true; // "All"
        })
        : []

    return (
        <main className="content-page--admin">
            <TopViewModule
                title="Mis Metas Financieras"
                icon={GoalIcon}
                txtBtnAdd="Añadir meta"
                txtBtnAddShort="Añadir"
                btnAddOnClick={() => setModalForm("new")}
                quickState1Value={`${totalGoals} metas creadas`}
                quickState2Value={`${totalCompleted} completadas`}
                quickState3Value={`${totalExpired} vencidas`}
                onSearchSubmit={handleSearchSubmit}
            />
            <SearchBar
                titleModule="Metas"
                searchName="goals"
                placeholder="Buscar meta por su título"
                onSearchSubmit={handleSearchSubmit}
                filter={filter}
                setFilter={setFilter}
                module="Goals"
            />

            <GoalsGallery
                setEditForm={handleEditForm}
                goals={goalsList}
                loadingState={loadingState}
                searchQueryValue={searchQuery}
            />

            {/* Modal form */}
            {modalForm === "new" &&
                <NewGoalForm
                    modalRef={formRef}
                    onClose={() => setModalForm(null)}
                />
            }
            {modalForm === `edit ${editGoalId}` && editGoalId !== null && (
                <EditGoalForm
                    id={editGoalId}
                    modalRef={formRef}
                    onClose={()  => setModalForm(null)}
                />
            )}
        </main>
    )
}

export default GoalsView