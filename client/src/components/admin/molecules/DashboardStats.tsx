// Styles for this component
import "../../../assets/css/components/admin/DashboardStats.css";

// React icons
import { MdOutlineArrowOutward } from "react-icons/md";
import { RiWallet3Line } from "react-icons/ri";
import { IoCalendarNumberOutline } from "react-icons/io5";
import { LiaPiggyBankSolid } from "react-icons/lia";

// Query
import { useGetStats } from "../../../services/admin/queries";

const DashboardStats = () => {
    const stats = useGetStats()

    return (
        <section className="dashboard-stats">
            {/* Incomes */}
            <div className="item-dashboard-stats item-incomes-dashboard-stats">
                <div className="top-item-dashboard-stats">
                    <div className="txt-item-dashboard-stats">
                        <h1>Ingresos totales</h1>
                        <h2>${stats.totalIncomes}</h2>
                    </div>
                    <div className="icon-item-dashboard-stats">
                        <MdOutlineArrowOutward />
                    </div>
                </div>
                <div className="btm-item-dashboard-stats">
                    <div className="caption-btm-item-dashboard-stats">
                        <RiWallet3Line />
                        Promedio diario:
                    </div>
                    $141.67
                </div>
            </div>

            {/* Expenses */}
            <div className="item-dashboard-stats item-expenses-dashboard-stats">
                <div className="top-item-dashboard-stats">
                    <div className="txt-item-dashboard-stats">
                        <h1>Gastos totales</h1>
                        <h2>${stats.totalExpenses}</h2>
                    </div>
                    <div className="icon-item-dashboard-stats">
                        <MdOutlineArrowOutward />
                    </div>
                </div>
                <div className="btm-item-dashboard-stats">
                    <div className="caption-btm-item-dashboard-stats">
                        <IoCalendarNumberOutline />
                        Movimientos:
                    </div>
                    24 este mes
                </div>
            </div>
    
            {/* Balance */}
            <div className="item-dashboard-stats item-balance-dashboard-stats">
                <div className="top-item-dashboard-stats">
                    <div className="txt-item-dashboard-stats">
                        <h1>Saldo</h1>
                        <h2>${stats.totalBalance}</h2>
                    </div>
                    <div className="icon-item-dashboard-stats">
                        <RiWallet3Line />
                    </div>
                </div>
                <div className="btm-item-dashboard-stats">
                    <div className="caption-btm-item-dashboard-stats">
                        <LiaPiggyBankSolid />
                        Tasa de ahorro:
                    </div>
                    64%
                </div>
            </div>
        </section>
    )
}

export { DashboardStats };