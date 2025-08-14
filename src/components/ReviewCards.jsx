import Card from "./Card";
import { motion } from "framer-motion";

export default function ReviewCards({ review }) {
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
                    value={review.totalInput + review.totalOutput}
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
                    value={review.totalInput}
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
                    value={review.totalOutput}
                />

            </motion.div>
        </div>
    );
};