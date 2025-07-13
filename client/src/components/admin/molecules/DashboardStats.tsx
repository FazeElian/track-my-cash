// Styles for this component
import "../../../assets/css/components/admin/DashboardStats.css";

// Lucide react icons
import {
    ArrowMovementIcon,
    CalendarIcon,
    WalletIcon,
} from "../../../lib/lists/Icons";

import { TrendingUp, TrendingDown } from "lucide-react";

// Query
import { useGetStats } from "../../../services/admin/queries";

// Utils
import { formatAmount } from "../../../lib/utils/formatAmount";

const DashboardStats = () => {
    const stats = useGetStats()

    return (
        <section className="dashboard-stats">
            {/* Incomes */}
            <div className="item-dashboard-stats item-incomes-dashboard-stats">
                <div className="top-item-dashboard-stats">
                    <div className="txt-item-dashboard-stats">
                        <h1>Ingresos este mes</h1>
                        <h2>{formatAmount(stats.totalIncomes)}</h2>
                    </div>
                    <div className="icon-item-dashboard-stats">
                        <ArrowMovementIcon />
                    </div>
                </div>
                <div className="btm-item-dashboard-stats">
                    <div className="caption-btm-item-dashboard-stats">
                        <TrendingUp />
                        Promedio mensual:
                    </div>
                    {formatAmount(stats.averageIncomesAmountTransaction)}
                </div>
            </div>

            {/* Expenses */}
            <div className="item-dashboard-stats item-expenses-dashboard-stats">
                <div className="top-item-dashboard-stats">
                    <div className="txt-item-dashboard-stats">
                        <h1>Gastos este mes</h1>
                        <h2>{formatAmount(stats.totalExpenses)}</h2>
                    </div>
                    <div className="icon-item-dashboard-stats">
                        <ArrowMovementIcon />
                    </div>
                </div>
                <div className="btm-item-dashboard-stats">
                    <div className="caption-btm-item-dashboard-stats">
                        <TrendingDown />
                        Promedio mensual:
                    </div>
                    {formatAmount(stats.averageExpensesAmountTransaction)}
                </div>
            </div>
    
            {/* Balance */}
            <div className="item-dashboard-stats item-balance-dashboard-stats">
                <div className="top-item-dashboard-stats">
                    <div className="txt-item-dashboard-stats">
                        <h1>Saldo (histórico)</h1>
                        <h2>{formatAmount(stats.totalBalance)}</h2>
                    </div>
                    <div className="icon-item-dashboard-stats">
                        <WalletIcon />
                    </div>
                </div>
                <div className="btm-item-dashboard-stats">
                    <div className="caption-btm-item-dashboard-stats">
                        <CalendarIcon />
                        Movimientos:
                    </div>
                    {stats.allTransactionsAmount} completados este mes
                </div>
            </div>
        </section>
    )
}

export { DashboardStats };