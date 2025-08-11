import { LuChevronDown, LuChevronUp } from "react-icons/lu";

export default function Card({ title, value, change, isPositive, colorPalette }) {
    const formattedValue = new Intl.NumberFormat().format(value);

    const formattedChange = new Intl.NumberFormat('MZ', {minimumFractionDigits: 2}).format(Math.abs(change) / 100);

    return (
        <div className="p-4 rounded-lg border-2 bg-white hover:scale-105 cursor-default duration-300 transition-all">
            <h3 className="text-sm font-medium">{title}</h3>
            <p className="text-2xl font-black mt-1 text-black/80">{formattedValue} <small className="font-mono text-base text-gray-600 font-semibold -ml-1">MT</small></p>
            <div className={`flex items-center mt-2 text-sm ${isPositive ? 'text-green-500' : 'text-red-500'
                }`}>
                {isPositive ? (
                    <span className="font-black"><LuChevronUp /></span>
                ) : (
                    <span className="font-black"><LuChevronDown /></span>
                )}
                <span className="ml-1">{formattedChange} MT</span>
                <span className="ml-1">vs último mês</span>
            </div>
        </div>
    );
};