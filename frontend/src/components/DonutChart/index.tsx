import axios from 'axios';
import Chart from 'react-apexcharts';
import { SaleSum } from 'types/sale';
import { BASE_URL } from 'utils/requests';

type ChartData = {
    labels: string[];
    series: number[];
}

const DonutChart = () => {

    // FORMA DATA
    let chartData: ChartData = { labels: [], series: [] };

    // Foi utilizado let e não const porque iremos alterar o valor do chartData com os dados do backend

    /* const mockData = {
        series: [477138, 499928, 444867, 220426, 473088],
        labels: ['Anakin', 'Barry Allen', 'Kal-El', 'Logan', 'Padmé']
    } */

    axios.get(`${BASE_URL}/sales/amount-by-seller`)
        // Requisição assíncrona: quando você faz uma requisição na web no js essa operação é assíncrona
        // Ou seja, ela será chamada a sua aplicação continua rodando quando a resposta da api retornar, aí sim você executa alguma coisa
        // Para você executar essa coisa depois que vier a resposta da requisição 
        // O ponto then será definido dentro dele uma função para ser executada quando a resposta da API chegar e chegar com sucesso
        .then(response => { // Then tem como argumento a resposta e como é só um argumento não precisa de parênteses
            const data = response.data as SaleSum[];
            const myLabels = data.map(x => x.sellerName);
            const mySeries = data.map(x => x.sum);

            chartData = { labels: myLabels, series: mySeries };
            console.log(chartData);
        });

    const options = {
        legend: {
            show: true
        }
    }

    return (
        <Chart
            options={{ ...options, labels: chartData.labels }}
            series={chartData.series}
            type="donut"
            height="240"

        />
    )
}


export default DonutChart