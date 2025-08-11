import { useState, useEffect } from 'react';
import TransactionList from '../../components/TransactionList';
import SummaryCards from '../../components/SummaryCards';
import TransactionModal from '../../components/TransactionModal';
import Chart from 'react-apexcharts';
import { motion } from 'framer-motion';
import { FiLoader } from 'react-icons/fi';
import { TbCashRegister } from 'react-icons/tb';
import { LuActivity } from 'react-icons/lu';
import { PiCirclesThreePlusBold } from 'react-icons/pi';

// Paleta de cores profissional com brilhos e gradientes
const colorPalette = {
    accent: '#F59E0B', // Âmbar
    income: '#10B981', // Esmeralda
    expense: '#EF4444', // Vermelho
};

const CashFlowDashboard = () => {
    // Estados
    const [isLoading, setIsLoading] = useState(true);
    const [summaryData, setSummaryData] = useState(null);
    const [transactions, setTransactions] = useState([]);
    const [chartData, setChartData] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentTransaction, setCurrentTransaction] = useState(null);
    const [formData, setFormData] = useState({
        description: '',
        amount: '',
        type: 'expense',
        date: new Date().toISOString().split('T')[0]
    });

    // Carrega dados iniciais
    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        setIsLoading(true);
        try {
            const data = await fetchCashFlowData();
            setSummaryData(data.summary);
            setTransactions(data.transactions);
            setChartData(transformToChartData(data));
        } catch (error) {
            console.error('Erro ao carregar dados:', error);
        } finally {
            setIsLoading(false);
        }
    };

    // CRUD Operations
    const handleCreate = async (e) => {
        e.preventDefault();
        const newTransaction = {
            id: Date.now().toString(),
            ...formData,
            amount: parseFloat(formData.amount),
            date: new Date(formData.date).toISOString()
        };

        setTransactions([newTransaction, ...transactions]);
        updateSummary([newTransaction, ...transactions]);
        resetForm();
        setIsModalOpen(false);
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        const updatedTransactions = transactions.map(t =>
            t.id === currentTransaction.id ? { ...t, ...formData, amount: parseFloat(formData.amount) } : t
        );

        setTransactions(updatedTransactions);
        updateSummary(updatedTransactions);
        resetForm();
        setIsModalOpen(false);
    };

    const handleDelete = (id) => {
        const filteredTransactions = transactions.filter(t => t.id !== id);
        setTransactions(filteredTransactions);
        updateSummary(filteredTransactions);
    };

    const handleEdit = (transaction) => {
        setCurrentTransaction(transaction);
        setFormData({
            description: transaction.description,
            amount: transaction.amount.toString(),
            type: transaction.type,
            date: transaction.date.split('T')[0]
        });
        setIsModalOpen(true);
    };

    const updateSummary = (transactions) => {
        const totalIncome = transactions
            .filter(t => t.type === 'income')
            .reduce((sum, t) => sum + t.amount, 0);

        const totalExpenses = transactions
            .filter(t => t.type === 'expense')
            .reduce((sum, t) => sum + t.amount, 0);


        setSummaryData({
            totalIncome,
            totalExpenses,
            balanceChange: 0, // Simulação
            incomeChange: 0,
            expenseChange: 0
        });

        // Atualiza gráfico
        setChartData(transformToChartData({
            chartLabels: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
            incomeData: [12000, 19000, 15000, 18000, totalIncome / 5, 22000],
            expenseData: [8000, 12000, 10000, 9000, totalExpenses / 5, 11000]
        }));
    };

    const resetForm = () => {
        setFormData({
            description: '',
            amount: '',
            type: 'expense',
            date: new Date().toISOString().split('T')[0]
        });
        setCurrentTransaction(null);
    };

    // Configurações do gráfico
    const transformToChartData = (rawData) => {
        return {
            series: [
                {
                    name: 'Entradas',
                    data: rawData.incomeData,
                    color: colorPalette.income
                },
                {
                    name: 'Saídas',
                    data: rawData.expenseData,
                    color: colorPalette.expense
                }
            ],
            options: {
                chart: {
                    type: 'area',
                    stacked: false,
                    toolbar: {
                        show: false,
                    },
                },
                dataLabels: {
                    enabled: false,
                },
                xaxis: {
                    categories: rawData.chartLabels,
                    axisBorder: {
                        show: false,
                    }
                },
                yaxis: {
                    labels: {
                        show: false,
                    }
                },
                legend: {
                    position: 'top',
                    horizontalAlign: 'right',
                    fontSize: '10px'
                }
            }
        };
    };

    // Renderização condicional
    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-gray-50">
                <div className="w-full flex flex-col justify-center items-center">
                    <FiLoader className='animate-spin' size={32} color='#10B981' />
                </div>
            </div>
        );
    }

    if (!summaryData) {
        return (
            <div className="text-center py-10 bg-red-100 text-red-700 rounded border border-red-700">
                <h2 className="text-xl font-semibold">Erro ao carregar dados</h2>
                <p>Por favor, tente novamente mais tarde</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen p-2 py-4 md:p-8 bg-gray-50">
            <div className="max-w-7xl mx-auto">
                {/* Cabeçalho */}
                <header className="mb-8 text-gray-900">
                    <h1 className="text-3xl flex items-center font-bold uppercase text-[#10B981]"><TbCashRegister size={36} /> CashFlow</h1>
                    <p className='opacity-60 ml-1'>Controle de Fluxo de Caixa</p>
                </header>



                {/* Grid Principal */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                    {/* Gráfico */}
                    <div className="lg:col-span-2">
                        <div className="">
                            <motion.div
                                initial={{ opacity: 0.8, x: -100 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{
                                    delay: 0.5,
                                    duration: 2,
                                    type: "spring"
                                }}>

                                <h3 className="flex items-centertext-xl px-2 font-semibold mb-4 py-5 pl-2 rounded-md border bg-white shadow-sm">
                                    <LuActivity size={22} className='mr-2' />
                                    <span>Fluxo de Caixa</span>
                                </h3>
                            </motion.div>
                            {chartData.series && (
                                <motion.div
                                    initial={{ opacity: 0.5, scale: 0.5 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{
                                        duration: 1,
                                    }}
                                >
                                    <Chart
                                        options={chartData.options}
                                        series={chartData.series}
                                        type="area"
                                        height={400}
                                    />
                                </motion.div>
                            )}
                        </div>
                    </div>

                    {/* Cartões de Resumo */}
                    <div>


                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                delay: 2,
                                duration: 2.8
                            }}>

                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="h-16 rounded-md w-full font-medium flex justify-center items-center gap-2 transition-sall hover:shadow-lg mb-4 text-white shadow-sm border-teal-600 border-b-8 bg-[#10B981]/80 hover:scale-95 active:scale-105 duration-500 transition-transform text-sm uppercase">
                                <PiCirclesThreePlusBold size={20} className='font-bold' />
                                Nova Transação
                            </button>
                        </motion.div>
                        <SummaryCards summary={summaryData} colorPalette={colorPalette} />
                    </div>
                </div>

                {/* Lista de Transações */}
                <motion.div
                    initial={{ opacity: 0.8, y: 200 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                        delay: 1,
                        duration: 2,
                        type: "spring"
                    }}>

                    <div className="overflow-hidden mb-20" style={{
                        backgroundColor: colorPalette.card,
                        borderColor: colorPalette.border
                    }}>
                        <TransactionList
                            transactions={transactions}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                            colorPalette={colorPalette}
                        />
                    </div>
                </motion.div>
            </div>

            {/* Modal para CRUD */}
            {isModalOpen && (

                <TransactionModal
                    formData={formData}
                    setFormData={setFormData}
                    currentTransaction={currentTransaction}
                    onSubmit={currentTransaction ? handleUpdate : handleCreate}
                    onClose={() => {
                        setIsModalOpen(false);
                        resetForm();
                    }}
                    colorPalette={colorPalette}
                />
            )}
        </div>
    );
};



// Mock de dados
async function fetchCashFlowData(range) {
    // Simula delay de rede
    await new Promise(resolve => setTimeout(resolve, 500));

    // Dados de exemplo
    const mockData = {
        monthly: {
            summary: {
                balanceChange: 5.2,
                totalIncome: 185000,
                incomeChange: 12.3,
                totalExpenses: 60000,
                expenseChange: -3.4
            },
            transactions: [
                {
                    id: '1',
                    date: '2023-05-15',
                    description: 'Venda de Caju',
                    amount: 25000,
                    type: 'income'
                },
                {
                    id: '2',
                    date: '2023-05-14',
                    description: 'Aluguel do Armazém',
                    amount: 8000,
                    type: 'expense'
                },
                {
                    id: '3',
                    date: '2023-05-10',
                    description: 'Transporte de Mercadorias',
                    amount: 3500,
                    type: 'expense'
                },
                {
                    id: '4',
                    date: '2023-05-05',
                    description: 'Venda de Mariscos',
                    amount: 18000,
                    type: 'income'
                }
            ],
            chartLabels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai'],
            incomeData: [12000, 19000, 15000, 18000, 25000],
            expenseData: [8000, 12000, 10000, 9000, 8000]
        }
    };

    return mockData[range] || mockData.monthly;
}

export default CashFlowDashboard;