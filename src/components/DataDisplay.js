import React from 'react';

function DataDisplay({ patientData, healthStatus, isVisible }) {
  if (!isVisible) return null;

  return (
    <div className="data-container">
      <h2>Latest Patient Data</h2>
      <div className="data-item"><strong>Heart Rate:</strong> {patientData.heart_rate || 'N/A'} bpm</div>
      <div className="data-item"><strong>Temperature:</strong> {patientData.temperature || 'N/A'} °C</div>
      <div className="data-item"><strong>Blood Pressure:</strong> {patientData.blood_pressure ? `${patientData.blood_pressure[0]}/${patientData.blood_pressure[1]}` : 'N/A'} mmHg</div>
      <div className="data-item"><strong>Age:</strong> {patientData.age || 'N/A'}</div>
      <div className="data-item"><strong>Weight:</strong> {patientData.weight || 'N/A'} kg</div>
      <div className="data-item"><strong>Gender:</strong> {patientData.gender || 'N/A'}</div>
      <div className="data-item"><strong>Health Status:</strong> {healthStatus ? `${patientData.risk_level}` : 'Evaluating...'}</div>
    </div>
  );
}

export default DataDisplay;
