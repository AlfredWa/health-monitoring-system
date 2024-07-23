import React, { useEffect, useState } from 'react';

function MedicalHistory({ patientId }) {
  const [medicalHistory, setMedicalHistory] = useState([]);

  useEffect(() => {
    const fetchMedicalHistory = async () => {
      try {
        const response = await fetch(`http://localhost:5301/get_medical_history/${patientId}`);
        const data = await response.json();
        if (response.ok) {
          setMedicalHistory(data);
        } else {
          throw new Error(data.message || 'Error fetching medical history');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    if (patientId) {
      fetchMedicalHistory();
    }
  }, [patientId]);

  return (
    <div className="medical-history-container">
      <h2>Medical History</h2>
      {medicalHistory.length > 0 ? (
        <ul>
          {medicalHistory.map((entry, index) => (
            <li key={index}>
              <strong>Date:</strong> {entry.date}, <strong>Event:</strong> {entry.event}, <strong>Notes:</strong> {entry.notes}
            </li>
          ))}
        </ul>
      ) : (
        <p>No medical history available.</p>
      )}
    </div>
  );
}

export default MedicalHistory;
