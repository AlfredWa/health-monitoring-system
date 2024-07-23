import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

const TemperatureChart = ({patientData}) => {
  console.log(patientData)
  const [data, setData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Temperature (°C)',
        data: [],
        fill: false,
        borderColor: 'rgb(255, 99, 132)',
        tension: 0.1
      }
    ]
  });

  useEffect(() => {
    updateChartData(patientData);
  }, [patientData]); 

  const updateChartData = () => {
    setData(prevData => ({
      ...prevData,
      datasets: [{
        ...prevData.datasets[0],
        data: [...prevData.datasets[0].data, patientData.temperature].slice(-10) // Keep last 10 data points
      }],
      labels: [...prevData.labels, new Date().toLocaleTimeString()].slice(-10) // Update labels accordingly
    }));
  };

  const options = {
    scales: {
      y: {
        beginAtZero: false
      }
    },
    animation: {
      duration: 200 // Turn off animation for smoother update
    },
  };

  return <Line data={data} options={options} />;
};

export default TemperatureChart;
