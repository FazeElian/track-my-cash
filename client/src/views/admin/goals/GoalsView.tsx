import { useEffect, useRef, useState } from "react";

// Components for this view
import { SearchBar } from "../../../components/admin/SearchBar"
import { TopViewModule } from "../../../components/admin/TopTitle"
import { GoalsGallery } from "./GoalsGallery";
import { EditGoalForm } from "./EditGoalForm";

// React icons
import { GoGoal } from "react-icons/go";
import NewGoalForm from "./NewGoalForm";

// Query
import { useFetchAllGoals } from "../../../services/goals/queries";

const GoalsView = () => {
    const [modalForm, setModalForm] = useState<"new" | `edit ${number}` | null>(null);
    const [editGoalId, setEditGoalId] = useState<number | null>(null);
    const formRef = useRef<HTMLFormElement>(null);
    const { data: goals, isLoading } = useFetchAllGoals()

    // Close the modal when user clicks outside the form
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (formRef.current && !formRef.current.contains(event.target as Node)) {
                setModalForm(null);
            }
        };

        if (modalForm) {
            document.addEventListener("mousedown", handleClickOutside);

            // Remove scroll on body
            document.body.classList.add("no-scroll");
            return () => document.body.classList.remove("no-scroll");
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [modalForm]);

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
        ? goals : []

    return (
        <main className="content-page--admin">
            <TopViewModule
                title="Mis Metas Financieras"
                icon={GoGoal}
                txtBtnAdd="Añadir meta"
                txtBtnAddShort="Añadir"
                btnAddOnClick={() => setModalForm("new")}
                quickState1Value={`${5} metas creadas`}
                quickState2Value={`${3} completadas`}
                quickState3Value={`${2} vencidas`}
                onSearchSubmit={() => console.log()}
            />
            <SearchBar
                titleModule="Metas"
                searchName="goals"
                placeholder="Buscar meta por su título"
                onSearchSubmit={() => console.log()}
            />

            <GoalsGallery
                setEditForm={handleEditForm}
                goals={goalsList}
                loadingState={loadingState}
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