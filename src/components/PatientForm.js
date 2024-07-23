import React from 'react';

function PatientForm({ setCurrentPatientId }) {
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Extract the values from the form elements
    const patientId = e.target.patientId.value;
    const age = e.target.age.value;
    const weight = e.target.weight.value;
    const gender = e.target.gender.value;

    // Update the patient ID in the parent component state
    setCurrentPatientId(patientId);

    // Data object to send to the backend
    const formData = {
      age: parseInt(age, 10), // Ensure the age is sent as a number
      weight: parseInt(weight, 10), // Ensure the weight is sent as a number
      gender
    };

    // Send the data to the backend using Fetch API
    try {
      const response = await fetch(`http://localhost:5301/submit_user_info/${patientId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      if (response.ok) {
        console.log('Submission successful', data);
        alert('User information submitted successfully!');
      } else {
        throw new Error(data.message || 'Failed to submit data');
      }
    } catch (error) {
      console.error('Error:', error);
      alert(`Error submitting data: ${error.message}`);
    }
  };

  // This function is triggered whenever the selected patient ID changes
  const handlePatientIdChange = (e) => {
    const patientId = e.target.value;
    setCurrentPatientId(patientId); // Immediately update the currentPatientId in the parent component
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <label htmlFor="patientId">Select Patient ID:</label>
        <select name="patientId" id="patientId" onChange={handlePatientIdChange}>
          <option value="1">Patient 1</option>
          <option value="2">Patient 2</option>
          <option value="3">Patient 3</option>
          <option value="4">Patient 4</option>
          <option value="5">Patient 5</option>
        </select>
        <label htmlFor="age">Age:</label>
        <input type="number" id="age" name="age" required />
        <label htmlFor="weight">Weight (kg):</label>
        <input type="number" id="weight" name="weight" required />
        <label htmlFor="gender">Gender:</label>
        <select id="gender" name="gender" required>
          <option value="">Select your gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default PatientForm;
