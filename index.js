// script.js

// Array to store vehicle information (populated from the backend)
let vehicleHistory = [];

// Fetch vehicle data from the backend on page load
async function fetchVehicles() {
  try {
    const response = await axios.get('http://localhost:5000/vehicles');
    vehicleHistory = response.data;
    showContent('home'); // Show the home page with updated history
  } catch (err) {
    console.error('Error fetching vehicle data:', err);
  }
}

// Function to display content based on the selected section
function showContent(section) {
  const contentArea = document.getElementById('content-area');
  contentArea.innerHTML = '';

  if (section === 'addVehicle') {
    contentArea.innerHTML = `
      <h1>Vehicle Information Form</h1>
      <form id="vehicle-form" onsubmit="submitVehicleForm(event)">
        <div class="form-group">
          <label for="vehicle-name">Vehicle Name:</label>
          <input type="text" id="vehicle-name" name="vehicle-name" placeholder="Enter vehicle name" required>
        </div>
        <div class="form-group">
          <label for="vehicle-type">Vehicle Type:</label>
          <select id="vehicle-type" name="vehicle-type" required>
            <option value="">Select type</option>
            <option value="Car">Pick-up</option>
            <option value="Truck">Truck</option>
            <option value="Motorcycle">Loading Rickshaw</option>
            <option value="Bus">Container</option>
          </select>
        </div>
        <div class="form-group">
          <label for="vehicle-number">Vehicle Number:</label>
          <input type="text" id="vehicle-number" name="vehicle-number" placeholder="Enter vehicle number" required>
        </div>
        <div class="form-group">
          <label for="owner-name">Owner Name:</label>
          <input type="text" id="owner-name" name="owner-name" placeholder="Enter owner name" required>
        </div>
        <div class="form-group">
          <label for="registration-date">Registration Date:</label>
          <input type="date" id="registration-date" name="registration-date" required>
        </div>
        <button type="submit" class="submit-btn">Submit</button>
      </form>
    `;
  } else if (section === 'allVehicles') {
    let historyHtml = `
      <h1>All Vehicles</h1>
      <p>Here is the list of submitted vehicle information:</p>
      <ul>
    `;
    if (vehicleHistory.length > 0) {
      vehicleHistory.forEach((vehicle, index) => {
        historyHtml += `
          <li>
            <strong>Vehicle ${index + 1}:</strong> ${vehicle.name} (${vehicle.type}) - ${vehicle.number}, 
            Owner: ${vehicle.owner}, Registered: ${vehicle.registrationDate}
          </li>
        `;
      });
    } else {
      historyHtml += `<li>No vehicle information submitted yet.</li>`;
    }
    historyHtml += `</ul>`;
    contentArea.innerHTML = historyHtml;
  } else if (section === 'home') {
    contentArea.innerHTML = `
      <h1>Home</h1>
      <p>Welcome to the dashboard. Use the menu to navigate between sections.</p>
    `;
  } else {
    contentArea.innerHTML = `
      <h1>${section.charAt(0).toUpperCase() + section.slice(1)} Section</h1>
      <p>Content for the ${section} section will appear here.</p>
    `;
  }
}

// Function to handle vehicle form submission
async function submitVehicleForm(event) {
  event.preventDefault();

  // Get form data
  const vehicleName = document.getElementById('vehicle-name').value;
  const vehicleType = document.getElementById('vehicle-type').value;
  const vehicleNumber = document.getElementById('vehicle-number').value;
  const ownerName = document.getElementById('owner-name').value;
  const registrationDate = document.getElementById('registration-date').value;

  // Prepare data for submission
  const vehicleData = {
    name: vehicleName,
    type: vehicleType,
    number: vehicleNumber,
    owner: ownerName,
    registrationDate: registrationDate,
  };

  // Submit vehicle data to the backend
  try {
    await axios.post('http://localhost:5000/vehicles', vehicleData);
    alert('Vehicle information submitted successfully!');
    fetchVehicles(); // Refresh the history from the backend
  } catch (err) {
    console.error('Error submitting vehicle data:', err);
  }
}

// Fetch existing vehicle data on page load
fetchVehicles();
