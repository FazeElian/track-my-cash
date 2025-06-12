// Components for this view
import { SearchBar } from "../../../components/admin/SearchBar"
import { TopViewModule } from "../../../components/admin/TopTitle"
import { GoalsGallery } from "./GoalsGallery";

// React icons
import { GoGoal } from "react-icons/go";

const GoalsView = () => {
    return (
        <main className="content-page--admin">
            <TopViewModule
                title="Mis Metas Financieras"
                icon={GoGoal}
                txtBtnAdd="Crear meta"
                txtBtnAddShort="Crear"
                btnAddOnClick={() => console.log()}
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

            <GoalsGallery />
        </main>
    )
}

export default GoalsView