import { PureComponent } from "react";
import {
    PieChart,
    Pie,
    Tooltip,
    ResponsiveContainer,
    Cell
} from "recharts";

// Utils
import { formatAmount } from "../../../lib/utils/formatAmount";

const data = [
    { name: "Categoría A", value: 400 },
    { name: "Categoría B", value: 300 },
    { name: "Categoría C", value: 300 },
    { name: "Categoría D", value: 200 },
    { name: "Categoría E", value: 278 },
    { name: "Categoría F", value: 189 },
];

const COLORS = ["#3D90D9", "#7E3DD9", "#24BF67", "#D49124", "#D35724", "#D43724"];

export default class ExpensesByCategory extends PureComponent {
    render() {
        return (
            <ResponsiveContainer width="100%" height="100%">
                <PieChart width={400} height={400}>
                <Pie
                    dataKey="value"
                    nameKey="name"
                    isAnimationActive={true}
                    data={data}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    label={({ name, value }) => `${name}: ${formatAmount(value)}`}
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Tooltip
                    formatter={(value) => `$${value}`}
                />
                </PieChart>
            </ResponsiveContainer>
        );
    }
}