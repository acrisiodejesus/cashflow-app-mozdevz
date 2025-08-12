import { FiEdit3, FiTrash2 } from "react-icons/fi";
import { PiEmptyLight } from "react-icons/pi";

export default function TransactionList({ transactions, onEdit, onDelete }) {
    return (
        <div>
            <div className="px-6 py-4 border-2 rounded-md bg-white uppercase">
                <h2 className="text-lg font-bold text-gray-800">Últimas Transações</h2>
            </div>

            <div className="overflow-x-auto bg-gray-50">
                <table className="min-w-full divide-y mt-10">
                    <thead>
                        <tr className="border-2 bg-white">
                            <th className="px-6 py-4 text-left text-xs uppercase tracking-wider bg-white text-gray-700 font-bold">Data</th>
                            <th className="px-6 py-4 text-left text-xs uppercase tracking-wider bg-white text-gray-700 font-bold">Descrição</th>
                            <th className="px-6 py-4 text-left text-xs uppercase tracking-wider bg-white text-gray-700 font-bold">Valor (MT)</th>
                            <th className="px-6 py-4 text-left text-xs uppercase tracking-wider bg-white text-gray-700 font-bold">Ações</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y">
                        {transactions.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="px-6 py-4 text-center text-sm flex w-full items-center justify-center text-gray-500">
                                    <PiEmptyLight size={16} /> <span className="opacity-80 ml-1">Nenhuma transação registada</span>
                                </td>
                            </tr>
                        ) : (
                            transactions.map((transaction) => (
                                <tr key={transaction.id} className="hover:bg-white">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                        {new Date(transaction.date).toLocaleDateString('pt-MZ')}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium"  >
                                        {transaction.description}
                                    </td>
                                    <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                                        }`}>
                                        {transaction.type === 'income' ? '+' : '-'}
                                        {new Intl.NumberFormat('MZ', {
                                            style: 'currency',
                                            currency: 'MZN'
                                        }).format(transaction.amount)}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <div className="flex space-x-5">
                                            <button
                                                onClick={() => onEdit(transaction)}
                                                className="text-blue-600 flex items-center hover:text-blue-800"
                                            >
                                                <FiEdit3 size={16} />
                                                <span className="ml-1">Editar</span>
                                            </button>
                                            <button
                                                onClick={() => onDelete(transaction.id)}
                                                className="text-red-600 flex items-center hover:text-red-800"
                                            >
                                                <FiTrash2 size={15} />
                                                <span className="ml-1">Eliminar</span>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};