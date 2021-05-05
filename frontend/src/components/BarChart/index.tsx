import Chart from 'react-apexcharts'; 

const BarChart = () => {

    const options = {
        plotOptions: {
            bar: {
                horizontal: true,
            }
        },
    };
    
    const mockData = {
        labels: {
            categories: ['Anakin', 'Barry Allen', 'Kal-El', 'Logan', 'Padmé']
        },
        series: [
            {
                name: "% Sucesso",
                data: [43.6, 67.1, 67.7, 45.6, 71.1]                   
            }
        ]
    };
    return (
        <Chart 
            options={{...options, xaxis: mockData.labels}} 
            series={mockData.series}
            type="bar"
            height="240"
            /*... : pega o objeto do jeito que está, só que agora você pode atribuir mais coisas dentro desse objeto. xaxis: é o eixo x, quais são os rótulos, os rótulos serão iguais aos mockData.labels porque é nos labels que estão os valores correspondentes aos parâmetros do eixo x. mock = dados de "mentirinha"*/ 
        />
    );
}

export default BarChart; 