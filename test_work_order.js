const axios = require('axios');

async function test() {
  try {
    const loginRes = await axios.post('http://localhost:5001/api/auth/login', {
      username: 'admin',
      password: 'password123'
    });
    const token = loginRes.data.token;
    console.log("Logged in!");

    const payload = {
        site_name: "Test Site " + Date.now(),
        client_name: "Test Client",
        assigned_name: "Test Assignee",
        site_address: "123 Test St",
        status: "Pending",
        start_date: null,
        est_budget: 1500,
        description: "Test description"
    };

    const createRes = await axios.post('http://localhost:5001/api/workorders', payload, {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log("Successfully created work order:", createRes.data);
  } catch (err) {
    if (err.response) {
      console.error("Error creating work order:", err.response.status, err.response.data);
    } else {
      console.error("Error:", err.message);
    }
  }
}

test();
