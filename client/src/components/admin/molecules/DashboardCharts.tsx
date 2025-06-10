// Styles for this component
import "../../../assets/css/components/admin/DashboardCharts.css";

// Components
import MonthlySummary from "./MonthlySummary";
import { ExpensesByCategory } from "./ExpensesByCategory";

const DashboardCharts = () => {
    return (
        <section className="dashboard-charts">
            <div className="item-dashboard-charts">
                <h1>Resumen Mensual</h1>
                <h2>Ingresos vs Gastos en los últimos 6 meses</h2>
                <MonthlySummary />
            </div>
            <div className="item-dashboard-charts">
                <h1>Categorías de gastos</h1>
                <h2>Distribución de tus gastos por categoría</h2>
                <ExpensesByCategory />
            </div>
        </section>
    )
}

export { DashboardCharts };