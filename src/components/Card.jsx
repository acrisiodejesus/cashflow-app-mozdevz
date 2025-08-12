export default function Card({ title, value }) {
    const formattedValue = new Intl.NumberFormat().format(value);

    return (
        <div className="p-4 py-8 rounded-lg border-2 bg-white hover:scale-105 cursor-default duration-300 transition-all">
            <h3 className="text-sm font-medium">{title}</h3>
            <p className="text-2xl font-black mt-1 text-black/80">
                {formattedValue}
                <small className="font-mono text-base text-gray-600 font-semibold ml-1">MT</small>
            </p>
        </div>
    );
};