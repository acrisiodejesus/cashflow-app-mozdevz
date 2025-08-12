import { useState } from "react";
import Chart from "react-apexcharts"

export default function MyChart({ rowData }) {

    const [data, setData] = useState({})

    setData(rowData)

    // Configurações do gráfico
    const transformToChartData = (data) => {
        return {
            series: [
                {
                    name: 'Entradas',
                    data: data.incomeData,
                    color: "#10B981"
                },
                {
                    name: 'Saídas',
                    data: data.expenseData,
                    color: "#EF4444"
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
                    categories: data.chartLabels,
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
    return (
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
                {data.series && (
                    <motion.div
                        initial={{ opacity: 0.5, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                            duration: 1,
                        }}
                    >
                        <Chart
                            options={data.options}
                            series={data.series}
                            type="area"
                            height={400}
                        />
                    </motion.div>
                )}
            </div>
        </div>
    )
}