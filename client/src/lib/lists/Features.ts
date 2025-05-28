// Icons
import { MdOutlineTimeline, MdOutlineSubscriptions } from "react-icons/md";
import { FiTarget } from "react-icons/fi";
import { PiCalculatorFill } from "react-icons/pi";
import { AiOutlineLineChart } from "react-icons/ai";
import { TbReport } from "react-icons/tb";

export const Features = [
    {
        id: 1,
        icon: MdOutlineTimeline,
        colorClass: "feat-color-green",
        itemColorClass: "item-feat-color-green",
        name: "Seguimiento Inteligente",
        description: "Categoriza y rastrea automáticamente todos tus gastos con información inteligente y tendencias en tiempo real.",
    },
    {
        id: 2,
        icon: AiOutlineLineChart,
        colorClass: "feat-color-greenblue",
        itemColorClass: "item-feat-color-greenblue",
        name: "Presupuestos Inteligentes",
        description: "Establece presupuestos realistas y recibe alertas inteligentes cuando te acerques a tus límites.",
    },
    {
        id: 3,
        icon: FiTarget,
        colorClass: "feat-color-purple",
        itemColorClass: "item-feat-color-purple",
        name: "Objetivos Financieros",
        description: "Define metas como ahorrar para un viaje o pagar una deuda, y sigue tu progreso con recordatorios motivadores.",
    },
    {
        id: 4,
        icon: MdOutlineSubscriptions,
        colorClass: "feat-color-blue",
        itemColorClass: "item-feat-color-blue",
        name: "Gestión de Suscripciones",
        description: "Identifica automáticamente tus suscripciones activas, organiza sus fechas de cobro y recibe alertas antes de que se renueven.",
    },
    {
        id: 5,
        icon: PiCalculatorFill,
        colorClass: "feat-color-green",
        itemColorClass: "item-feat-color-green",
        name: "Calculadora Financiera",
        description: "Simula préstamos, ahorros, cuotas o intereses con herramientas prácticas para planear mejor tus decisiones financieras.",
    },
    {
        id: 6,
        icon: TbReport,
        colorClass: "feat-color-orange",
        itemColorClass: "item-feat-color-orange",
        name: "Informe Mensual Automático",
        description: "Recibe un resumen mensual visual con tus ingresos, gastos, ahorros y recomendaciones para mejorar tu salud financiera.",
    }
];