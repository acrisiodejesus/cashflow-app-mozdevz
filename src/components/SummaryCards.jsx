import Card from "./Card";
import { motion } from "framer-motion";

export default function SummaryCards({ summary, colorPalette }) {
    return (
        <div className="space-y-3">

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                    delay: 0.5,
                    duration: 0.8
                }}
            >
                <Card
                    title="Total de Transações"
                    value={summary.totalIncome + summary.totalExpenses}
                    change={summary.balanceChange}
                    isPositive={summary.balanceChange >= 0}
                    colorPalette={colorPalette}
                />
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                    delay: 1,
                    duration: 1.8
                }}
            >
                <Card
                    title="Total de Receitas"
                    value={summary.totalIncome}
                    change={summary.incomeChange}
                    isPositive={true}
                    colorPalette={colorPalette}
                />
            </motion.div>


            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                    delay: 1.5,
                    duration: 2.8
                }}
            >
                <Card
                    title="Total de Despesas"
                    value={summary.totalExpenses}
                    change={summary.expenseChange}
                    isPositive={false}
                    colorPalette={colorPalette}
                />

            </motion.div>
        </div>
    );
};