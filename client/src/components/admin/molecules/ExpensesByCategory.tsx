import {
    PieChart,
    Pie,
    Tooltip,
    ResponsiveContainer,
    Cell
} from "recharts";

// Query
import { useGetExpensesByCategory } from "../../../services/admin/queries";
import { useFetchAllCategories } from "../../../services/categories/queries";

// Loading component
import { ModuleLoading } from "../ModuleLoading";

const COLORS = ["#3D90D9", "#7E3DD9", "#24BF67", "#D49124", "#D35724", "#D43724"];

const ExpensesByCategory = () => {
    const { data } = useGetExpensesByCategory()
    const { data: categoriesData } = useFetchAllCategories()

    if (!data || !categoriesData || !Array.isArray(categoriesData) || typeof data.percentagesByCategory !== "object") {
        return <ModuleLoading />;
    }
    
    const categoriesMap: { [key: string]: string } = {};
    categoriesData.forEach(cat => {
        categoriesMap[cat.id] = cat.name;
    });

    const percentages = data.percentagesByCategory || {};
    const pieChartData = Object.entries(percentages).map(
        ([categoryId, percentage]) => ({
            name: categoriesMap[categoryId] || `Categoría ${categoryId}`,
            value: percentage
        })
    );

    return (
        <ResponsiveContainer width="100%" height="100%">
            <PieChart width={400} height={400}>
            <Pie
                dataKey="value"
                nameKey="name"
                isAnimationActive={true}
                data={pieChartData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                label={({ name, value }) => `${name} : ${value}%`}
            >
                {pieChartData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
            </Pie>
            <Tooltip
                formatter={(value) => `${value}%`}
            />
            </PieChart>
        </ResponsiveContainer>
    );
}

export { ExpensesByCategory };