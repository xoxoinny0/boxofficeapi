import React, { memo } from 'react';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';

import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
)

const BarChartView = memo(({ labels, dataset, legend}) => {
    /** 그래프 옵션 */
    const options = {
        indexAxis: 'x',
        responsive: true
    };

    /** chart에 표시될 데이터 (막대그래프용) */
    const data = {
        labels: labels,
        datasets: [{
            label: legend,
            backgroundColor:['rgba(255, 0, 0,0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(53, 100, 50, 0.2)', 'rgba(250, 10, 100, 0.2)', 'rgba(254, 224, 255, 0.2)', 'rgba(183, 183, 234, 0.2)', 'rgba(255, 178, 195, 0.2)'],
            borderColor: ['rgba(255, 0, 0,1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)', 'rgba(53, 100, 50, 1)', 'rgba(250, 10, 100, 1)', 'rgba(254, 224, 255, 1)', 'rgba(183, 183, 234, 1)', 'rgba(255, 178, 195, 1)'],
            borderWidth: 1,
            data: dataset,
        }]
    };

    return ((labels && dataset) && <Bar data={data} options={options} />);  
});

BarChartView.defaultProps = {
    labels: [],
    dataset: [],
    legend: ''
}

export default BarChartView;