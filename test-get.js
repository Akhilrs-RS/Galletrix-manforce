const axios = require('axios');
async function test() {
  const loginRes = await axios.post(`http://localhost:5001/api/auth/login`, { username: "admin", password: "password123" });
  const token = loginRes.data.token;
  const res = await axios.get(`http://localhost:5001/api/workers`, { headers: { Authorization: `Bearer ${token}` } });
  console.log("Keys returned by API:", Object.keys(res.data[0] || {}));
}
test();
