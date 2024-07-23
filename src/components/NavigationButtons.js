import React from 'react';

function NavigationButtons({ setCurrentView }) {
  return (
    <div className="nav-buttons">
      <button onClick={() => setCurrentView('data')}>Show Data</button>
      <button onClick={() => setCurrentView('chartHeartRate')}>Show Heart Rate Chart</button>
      <button onClick={() => setCurrentView('chartTemperature')}>Show Temperature Chart</button>
      <button onClick={() => setCurrentView('chartBloodPressure')}>Show Blood Pressure Chart</button>
    </div>
  );
}

export default NavigationButtons;
