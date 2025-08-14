import { useState, useEffect } from 'react';
import TransactionList from '../../components/TransactionList';
import TransactionModal from '../../components/TransactionModal';
import Chart from 'react-apexcharts';
import { motion } from 'framer-motion';
import { FiLoader } from 'react-icons/fi';
import { TbCashRegister } from 'react-icons/tb';
import { LuActivity } from 'react-icons/lu';
import { PiCirclesThreePlusBold } from 'react-icons/pi';
import ReviewCards from '../../components/ReviewCards';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const Dashboard = () => {
    const navigate = useNavigate();
    // Estados
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [reviewData, setReviewData] = useState(null);
    const [transactions, setTransactions] = useState([]);
    const [chartData, setChartData] = useState({});
    const [currentTransaction, setCurrentTransaction] = useState(null);


    const [formData, setFormData] = useState({});

    const token = localStorage.getItem("token") ? localStorage.getItem("token") : navigate("/");
    // Carregamento de dados iniciais
    useEffect(() => {
        loadData();
    }, []);

   const loadData = async () => {
    setIsLoading(true);
    try {
        await axios.get("http://127.0.0.1:5000/api/transactions", {
            headers: {
                Authorization: "Bearer " + token
            }
        }).then((res) => res.data).then((data) => {
            setTransactions(data);

            // Organizar dados do Gráfico e Cards aqui, dentro do .then
            const chartLabels = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
            let inputTransaction = new Array(12).fill(0);
            let outputTransaction = new Array(12).fill(0);
            let totalInput = 0;
            let totalOutput = 0;

            data.forEach(transaction => {
                const date = new Date(transaction.date);
                const month = date.getMonth();
                if (transaction.type === "entrada") {
                    totalInput += transaction.amount;
                    inputTransaction[month] += transaction.amount;
                } else if (transaction.type === "saida") {
                    totalOutput += transaction.amount;
                    outputTransaction[month] += transaction.amount;
                }
            });

            setReviewData({
                totalInput,
                totalOutput,
            });

            setChartData(transformToChartData({ chartLabels, inputTransaction, outputTransaction }));
        }).catch((err) => console.error(err));
    } catch (error) {
        console.error('Erro ao carregar dados:', error);
    } finally {
        setIsLoading(false);
    }
};




    // CRUD

    // Adiciona nova transação    
    const addTransaction = async (e) => {
        e.preventDefault();
        const newTransaction = {
            description: formData.description,
            amount: parseFloat(formData.amount),
            type: formData.type,
        };

        const status = await axios.post("http://127.0.0.1:5000/api/transactions", newTransaction, {
            headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "application/json"
            }
        }).then((res) => res.status)
            .catch((err) => console.error(err));
        if (status == 201) {
            setIsModalOpen(false);
            resetForm();
            loadData();
        } else {
            alert("Erro inesperado");
        }



    };

    const updateTransaction = async (e) => {
        e.preventDefault();

        const id = currentTransaction.id;
        const transaction = {
            amount: formData.amount,
            type: formData.type,
            description: formData.description
        }
        const status = await axios.put(`http://127.0.0.1:5000/api/transactions/${id}`, transaction, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        }).then((res) => res.status).catch((err) => console.error("ERR: " + err))

        if (status == 200) {
            setIsModalOpen(false);
            resetForm();
            loadData();
        } else {
            alert("Erro inesperado");
        }
    };

    const deleteTransaction = async (id) => {
        const status = await axios.delete(`http://127.0.0.1:5000/api/transactions/${id}`, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        }).then((res) => res.status).catch((err) => console.error("ERR: " + err))

        if (status == 200) {
            loadData();
        } else {
            alert("Erro inesperado");
        }
    };

    const getEdit = (transaction) => {
        setCurrentTransaction(transaction);
        setFormData({
            description: transaction.description,
            amount: transaction.amount.toString(),
            type: transaction.type,
        });
        setIsModalOpen(true);
    };



    const resetForm = () => {
        setFormData({
            description: '',
            amount: '',
            type: '',
        });
        setCurrentTransaction(null);
    };

    // Configurações do gráfico
    const transformToChartData = (chartData) => {
        return {
            series: [
                {
                    name: 'Entradas',
                    data: chartData.inputTransaction,
                    color: "#10B981"
                },
                {
                    name: 'Saídas',
                    data: chartData.outputTransaction,
                    color: "#EF4444"
                }
            ],
            options: {
                chart: {
                    type: 'area',
                    zoom: false,
                    stacked: false,
                    toolbar: {
                        show: false,
                    },
                },
                dataLabels: {
                    enabled: false,
                },
                xaxis: {
                    categories: chartData.chartLabels,
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

    // Loader
    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-gray-50">
                <div className="w-full flex flex-col justify-center items-center">
                    <FiLoader className='animate-spin' size={32} color='#10B981' />
                </div>
            </div>
        );
    }



    return (
        <div className="min-h-screen p-2 py-4 md:p-8 bg-gray-50">
            <div className="max-w-7xl mx-auto">

                <header className="mb-8 text-gray-900">
                    <div>
                        <h1 className="text-3xl flex items-center font-bold uppercase text-[#10B981]"><TbCashRegister size={36} /> CashFlow</h1>
                        <p className='opacity-60 ml-1'>Controle de Fluxo de Caixa</p>
                    </div>
                    <div>

                    </div>
                </header>




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

                    {/* Cards de Resumo */}
                    <div>


                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                delay: 1,
                                duration: 1.8
                            }}>

                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="h-16 rounded-md w-full font-medium flex justify-center items-center gap-2 transition-sall hover:shadow-lg mb-4 text-white shadow-sm border-teal-600 border-b-8 bg-[#10B981]/80 hover:scale-95 active:scale-105 duration-500 transition-transform text-sm uppercase">
                                <PiCirclesThreePlusBold size={20} className='font-bold' />
                                Nova Transação
                            </button>
                        </motion.div>
                        <ReviewCards review={reviewData} />
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

                    <div className="overflow-hidden mb-20">
                        <TransactionList
                            transactions={transactions}
                            onEdit={getEdit}
                            onDelete={deleteTransaction}
                        />
                    </div>
                </motion.div>
            </div>

            {/* Modal do formulario */}
            {isModalOpen && (

                <TransactionModal
                    formData={formData}
                    setFormData={setFormData}
                    currentTransaction={currentTransaction}
                    onSubmit={currentTransaction ? updateTransaction : addTransaction}
                    onClose={() => {
                        loadData();
                        setIsModalOpen(false);
                        resetForm();
                    }}

                />
            )}
        </div>
    );
};



export default Dashboard;