import React, { useState, useEffect } from 'react';
import './App.css';
import PatientForm from './components/PatientForm';
import DataDisplay from './components/DataDisplay';
import HeartRateChart from './components/HeartRateChart';
import TemperatureChart from './components/TemperatureChart';
import BloodPressureChart from './components/BloodPressureChart';
import MedicalHistory from './components/MedicalHistory';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




function App() {
  const [patientData, setPatientData] = useState({ heart_rate: [], temperature: [], blood_pressure: [] });
  const [healthStatus, setHealthStatus] = useState({});
  const [currentPatientId, setCurrentPatientId] = useState(1);
  const [view, setView] = useState('data'); // options: 'data', 'heartRate', 'temperature', 'bloodPressure'

  const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:5301/get_current_patient_data/${currentPatientId}`);
      const data = await response.json();
      setPatientData(data);
      fetchHealthStatus();
    } catch (error) {
      console.error('Error fetching patient data:', error);
    }
  };

  const fetchHealthStatus = async () => {
    try {
      const response = await fetch(`http://localhost:5301/evaluate_current_health/`);
      const status = await response.json();
      setHealthStatus(status);
      console.log(status);

      for (let key in status) {
        const patientid = key
        const risk_level = status[key]
        console.log(`${patientid}: ${risk_level}`);
        if (risk_level  === "mid risk" || risk_level  === "high risk") {
          if (!toast.isActive('toast1')) {
            toast.warn(`Warning: Patient ${patientid} is in ${risk_level}.`, {
              toastId: 'toast1' + patientid
            });
            // console.log("2",toast.isActive('toast1'))
          }
        }
      }
    } catch (error) {
      console.error('Error fetching health status:', error);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 2000);
    return () => {
      clearInterval(interval);
    }
  }, [currentPatientId]);

  return (
    <div className="App">
      <ToastContainer position="top-center" autoClose={50000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
      <header>
        <h1>Health Monitoring System</h1>
      </header>
      <div className="container">
        <PatientForm setCurrentPatientId={setCurrentPatientId} />
        <DataDisplay patientData={patientData} healthStatus={healthStatus} isVisible={view === 'data'} />
        {view === 'heartRate' && <HeartRateChart patientData={patientData} />}
        {view === 'temperature' && <TemperatureChart patientData={patientData} />}
        {view === 'bloodPressure' && <BloodPressureChart patientData={patientData} />}
        {view === 'medicalHistory' && <MedicalHistory patientId={currentPatientId} />}
        <div className="nav-buttons">
          <button onClick={() => setView('data')}>Show Data</button>
          <button onClick={() => setView('heartRate')}>Show Heart Rate Chart</button>
          <button onClick={() => setView('temperature')}>Show Temperature Chart</button>
          <button onClick={() => setView('bloodPressure')}>Show Blood Pressure Chart</button>
          <button onClick={() => setView('medicalHistory')}>Show Medical History</button>
        </div>
      </div>
    </div>
  );
}

export default App;
