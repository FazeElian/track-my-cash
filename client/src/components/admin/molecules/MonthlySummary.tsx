import {
    BarChart,
    Bar,
    Rectangle,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
} from "recharts";

// Query
import { useGetSummary } from "../../../services/admin/queries";

// Utils
import { formatAmount } from "../../../lib/utils/formatAmount";

interface SummaryItem {
    month: string;
    incomes: number;
    expenses: number;
}

interface ChartDataItem {
    name: string;
    Ingresos: number;
    Gastos: number;
}

const MonthlySummary: React.FC = () => {
    const summary = useGetSummary();

    const data: ChartDataItem[] | undefined = summary.data
        ?.sort((a: SummaryItem, b: SummaryItem) => a.month.localeCompare(b.month))
        .map((item: SummaryItem): ChartDataItem => ({
            name: new Date(item.month + "-1").toLocaleString("es-ES", { month: "long" }),
            Ingresos: item.incomes,
            Gastos: item.expenses,
        }));

    return (
        <ResponsiveContainer width="100%" height="100%">
            <BarChart
                width={500}
                height={300}
                data={data}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip 
                    formatter={(value: number, name: string) => [`${formatAmount(value)}`, name]} 
                />
                <Legend />
                <Bar
                    dataKey="Ingresos"
                    fill="#24BF67"
                    activeBar={
                        <Rectangle
                            fill="#24BF67"
                            stroke="#213440"
                        />
                    }
                />
                <Bar
                    dataKey="Gastos"
                    fill="#D43724"
                    activeBar={
                        <Rectangle
                            fill="#9e281b"
                            stroke="#213440"
                        />
                    }
                />
            </BarChart>
        </ResponsiveContainer>
    );
};

export default MonthlySummary;