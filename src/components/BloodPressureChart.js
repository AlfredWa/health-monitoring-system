import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

const BarChart = ({patientData}) => {
  console.log(patientData)
  const [data, setData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Systolic (mmHg)',
        data: [],
        fill: false,
        borderColor: 'rgb(54, 162, 235)',
        tension: 0.1
      },
      {
        label: 'Diastolic (mmHg)',
        data: [],
        fill: false,
        borderColor: 'rgb(255, 206, 86)',
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
      datasets: [
        {
        ...prevData.datasets[0],
        data: [...prevData.datasets[0].data, patientData.blood_pressure[0]].slice(-10) // Keep last 10 data points
      },
      {
        ...prevData.datasets[1],
        data: [...prevData.datasets[1].data, patientData.blood_pressure[1]].slice(-10)
      }
    ],
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

export default BarChart;
