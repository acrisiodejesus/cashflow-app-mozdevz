
import { motion } from "framer-motion";

export default function TransactionModal({ formData, setFormData, currentTransaction, onSubmit, onClose }) {
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-md flex items-center justify-center p-4 z-50">

            <motion.div
                initial={{ opacity: 0.8, y: -500 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                    delay: 0,
                    duration: 1,
                    type: "spring"
                }}
                className="w-full flex justify-center"
            >
                <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
                    <div className="px-6 py-4 border-b flex justify-between items-center">
                        <h3 className="text-xl text-[#10B981] font-black uppercase px-4 mt-10">
                            {currentTransaction ? 'Editar Transação' : 'Nova Transação'}
                        </h3>
                        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    <form onSubmit={onSubmit} className="p-6 px-8 w-full">
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="type" className="block text-sm font-medium">
                                    Tipo
                                </label>
                                <select
                                    id="type"
                                    name="type"
                                    value={formData.type}
                                    onChange={handleChange}
                                    className="mt-1 block w-full rounded-md  focus:border-teal-600 focus:font-semibold text-gray-800 border-2 bg-white outline-[#10B981]/80 focus:ring-teal-600 py-3 px-2 font-semibold"
                                    required
                                >
                                    <option value="income">Entrada</option>
                                    <option value="expense">Saida</option>
                                </select>
                            </div>

                            <div>
                                <label htmlFor="description" className="block text-sm font-medium" >
                                    Descrição
                                </label>
                                <input
                                    type="text"
                                    id="description"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    placeholder="Ex. Compra de roupas"
                                    className="mt-1 block w-full rounded-md text-gray-800 border-2 outline-[#10B981]/80 focus:ring-teal-600 py-3 px-2 font-semibold bg-white"
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="amount" className="block text-sm font-medium" >
                                    Valor (MT)
                                </label>
                                <input
                                    type="number"
                                    id="amount"
                                    name="amount"
                                    value={formData.amount}
                                    onChange={handleChange}
                                    placeholder="Ex. 3400"
                                    className="mt-1 block w-full rounded-md text-gray-800 border-2 outline-[#10B981]/80 focus:ring-teal-600 py-3 px-2 font-semibold bg-whiter"
                                    min="0"
                                    step="0.01"
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="date" className="block text-sm font-medium" >
                                    Data
                                </label>
                                <input
                                    type="date"
                                    id="date"
                                    name="date"
                                    value={formData.date}
                                    onChange={handleChange}
                                    className="mt-1 block w-full rounded-md text-gray-800 border-2 outline-[#10B981]/80 focus:ring-teal-600 py-3 px-2 font-semibold bg-white"
                                    required
                                />
                            </div>
                        </div>

                        <div className="mt-6 flex justify-end space-x-5">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-5 py-2 rounded-md font-medium  text-sm border hover:scale-95 active:scale-95 text-red-600 border-b-4 border-red-600 duration-300"
                            >
                                Cancelar
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 rounded-md font-medium text-sm border-b-4 border-teal-800/50 hover:opacity-80 hover:scale-95 active:scale-105 duration-300 text-white bg-[#10B981]"
                            >
                                {currentTransaction ? 'Actualizar' : 'Registar agora'}
                            </button>
                        </div>
                    </form>

                </div>
            </motion.div>
        </div>
    );
};