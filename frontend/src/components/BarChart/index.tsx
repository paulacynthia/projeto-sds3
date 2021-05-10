import axios from 'axios';
import { useEffect, useState } from 'react';
import Chart from 'react-apexcharts'; 
import { SaleSuccess } from 'types/sale';
import { round } from 'utils/format';
import { BASE_URL } from 'utils/requests';

type SeriesData = {
    name: string;
    data: number[]; 
}

type ChartData = {
    labels: {
        categories: string[];
    };
    series: SeriesData[];
}

const BarChart = () => {

    const [chartData, setChartData] = useState<ChartData>({
        labels: {
            categories: []
        },
        series: [
            {
                name: "",
                data: []
            }
        ]
    });

    useEffect(() => {
        axios.get(`${BASE_URL}/sales/success-by-seller`)
            .then(response => {
                const data = response.data as SaleSuccess[];
                const myLabels = data.map(x => x.sellerName);
                const mySeries = data.map(x => round(100.0 * x.deals / x.visited, 1));

                setChartData({
                    labels: {
                        categories: myLabels
                    },
                    series: [
                        {
                            name: "% Success",
                            data: mySeries
                        }
                    ]
                });

            });
    }, []);

    const options = {
        plotOptions: {
            bar: {
                horizontal: true,
            }
        },
    };

    return (
        <Chart 
            options={{...options, xaxis: chartData.labels}} 
            series={chartData.series}
            type="bar"
            height="240"
            /*... : pega o objeto do jeito que está, só que agora você pode atribuir mais coisas dentro desse objeto. xaxis: é o eixo x, quais são os rótulos, os rótulos serão iguais aos mockData.labels porque é nos labels que estão os valores correspondentes aos parâmetros do eixo x. mock = dados de "mentirinha"*/ 
        />
    );
}

export default BarChart; 