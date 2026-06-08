const axios = require('axios');

const API_URL = 'http://localhost:5001/api';

async function testEndpoints() {
  try {
    const loginRes = await axios.post(`${API_URL}/auth/login`, {
      username: "admin",
      password: "password123"
    });
    
    const token = loginRes.data.token;
    
    const api = axios.create({
      baseURL: API_URL,
      headers: { Authorization: `Bearer ${token}` }
    });

    const testCases = [
      {
        name: "Workers",
        url: "/workers",
        method: "post",
        payload: {
          worker_id: "T-002",
          name: "Test Worker 2",
          category: "Skilled",
          type: "Own",
          nationality: "Indian",
          salary: "2000",
          hr_allowance: 200,
          da_allowance: 100,
          daily_wage: 80,
          monthly_wage: 2000,
          status: "Available"
        }
      },
      {
        name: "Clients",
        url: "/clients",
        method: "post",
        payload: {
          name: "Test Client 2",
          contact: "John Doe",
          phone: "1234567890",
          type: "Construction",
          workers: 10,
          rate: 50.0,
          status: "Active",
          revenue: 50000.0
        }
      },
      {
        name: "CRM Deals",
        url: "/crm/deals",
        method: "post",
        payload: {
          title: "New Test Deal",
          client: "Test Client 2",
          value: 100000,
          stage: "LEAD"
        }
      },
      {
        name: "Recruitment",
        url: "/recruitment",
        method: "post",
        payload: {
          candidate_name: "New Candidate 2",
          role: "Plumber",
          experience: "5 Years",
          nationality: "Nepalese",
          date: "2024-05-10",
          stage: "Interviewed"
        }
      },
      {
        name: "Leave Requests",
        url: "/leaverequests",
        method: "post",
        payload: {
          worker_id: 1, // MUST BE INT
          type: "Annual",
          from_date: "2024-06-01",
          to_date: "2024-06-15",
          days: 14,
          reason: "Vacation",
          status: "Pending"
        }
      }
    ];

    let allPassed = true;
    for (const test of testCases) {
      console.log(`\nTesting ${test.name}...`);
      try {
        const res = await api[test.method](test.url, test.payload);
        console.log(`✅ Success! Response status: ${res.status}`);
        
        // Let's do a GET to verify it saved
        const getRes = await api.get(test.url);
        const firstKey = Object.keys(test.payload)[0];
        const firstVal = test.payload[firstKey];
        const found = getRes.data.find(item => item[firstKey] === firstVal);
        
        if (found) {
          console.log(`   Verified in database! Found item with ${firstKey}=${firstVal}`);
        } else {
          console.log(`   ❌ WARNING: Received 2xx status, but item was NOT found when GETting from DB! (Likely null properties due to casing)`);
          allPassed = false;
        }

      } catch (err) {
        console.log(`❌ Failed: ${err.response ? err.response.status : err.message}`);
        if (err.response && err.response.data) {
          console.log(`   Error details: ${JSON.stringify(err.response.data)}`);
        }
        allPassed = false;
      }
    }

    if (allPassed) {
      console.log("\n🎉 ALL TESTS PASSED SUCCESSFULLY!");
    } else {
      console.log("\n⚠️ SOME TESTS FAILED!");
    }

  } catch (err) {
    console.error("Test script failed:", err.message);
  }
}

testEndpoints();
