// Styles for this component
import "../../../assets/css/components/admin/DashboardCharts.css";

// Images
import BotImg  from "../../../assets/img/Bot.png";

// Components
import MonthlySummary from "./MonthlySummary";

const DashboardCharts = () => {
    return (
        <section className="dashboard-charts">
            <div className="item-dashboard-charts">
                <h1>Resumen Mensual</h1>
                <h2>Ingresos vs Gastos en los últimos 6 meses</h2>
                <MonthlySummary />
            </div>
            <div className="item-bot-dashboard-charts item-dashboard-charts">
                <img src={BotImg} alt="Cashy bot" />
                <h1>Tu Asistente Financiero Inteligente</h1>
                <h2>Habla con <b>Cashy</b> sobre tus ingresos, metas y gastos.
                    Resuelve tus dudas y mejora tus decisiones al instante.
                </h2>
                <button type="button" className="font-lexend">
                    Hablar con Cashy
                </button>
            </div>
        </section>
    )
}

export { DashboardCharts };