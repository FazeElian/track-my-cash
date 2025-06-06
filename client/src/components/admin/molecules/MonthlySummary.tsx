import { PureComponent } from "react";
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

const data = [
    {
        name: "Enero",
        Gastos: 4000,
        Ingresos: 2400,
        amt: 2400,
    },
    {
        name: "Febrero",
        Gastos: 3000,
        Ingresos: 1398,
        amt: 2210,
    },
    {
        name: "Marzo",
        Gastos: 2000,
        Ingresos: 9800,
        amt: 2290,
    },
    {
        name: "Abril",
        Gastos: 2780,
        Ingresos: 3908,
        amt: 2000,
    },
    {
        name: "Mayo",
        Gastos: 1890,
        Ingresos: 4800,
        amt: 2181,
    },
    {
        name: "Junio",
        Gastos: 2390,
        Ingresos: 3800,
        amt: 2500,
    },
];

export default class MonthlySummary extends PureComponent {
    render() {
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
                    <Tooltip />
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
    }
}