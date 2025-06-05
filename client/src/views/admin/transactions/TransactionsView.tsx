// Components for this view
import { TopViewModule } from "../../../components/admin/TopTitle"
import { SearchBar } from "../../../components/admin/SearchBar"

// React icons
import { IoMdSwap } from "react-icons/io"

const TransactionsView = () => {
    return (
        <main className="content-page--admin">
            <TopViewModule
                title="Gestión de movimientos"
                icon={IoMdSwap}
                txtBtnAdd="Registrar movimiento"
                txtBtnAddShort="Registrar"
                btnAddOnClick={() => console.log()}
                quickState1Value={`${12} movimientos registrador`}
                quickState2Value={`${4} de ingresos`}
                quickState3Value={`${8} de gastos`}
            />
            <SearchBar
                titleModule="Movimientos"
                searchName="transactions"
                placeholder="Buscar movimiento por título"
            />
        </main>
    )
}

export default TransactionsView