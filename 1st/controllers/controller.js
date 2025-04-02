const axios = require("axios");
const WindowState = require("../models/model");

const WINDOW_SIZE = 10; // Fixed sliding window size

const testServerURLs = {
    p: "http://20.244.56.144/test/primes",
    f: "http://20.244.56.144/test/fibo",
    e: "http://20.244.56.144/test/even",
    r: "http://20.244.56.144/test/rand",
};

const numbers = async (req, res) => {
    try {
       
        const jwt = req.headers.authorization;
        if (!jwt || !jwt.startsWith("Bearer ")) {
            return res.status(401).json({ error: "Unauthorized: Missing or invalid token" });
        }
        const token = jwt.split(" ")[1];

        const { numberid } = req.params;

        if (!testServerURLs[numberid]) {
            return res.status(400).json({ error: "Invalid number ID" });
        }

      
        let windowData = await WindowState.findOne({ identifier: "averageCalculatorState" });

        if (!windowData) {
            windowData = new WindowState({ identifier: "averageCalculatorState", window: [] });
        }

        const prevState = [...windowData.window]; 

       
        const response = await axios.get(testServerURLs[numberid], {
            timeout: 500,
            headers: { Authorization: `Bearer ${token}` }, 
        });

        let newNumbers = response.data.numbers || [];
        newNumbers = [...new Set(newNumbers)]; 

        windowData.window = [...new Set([...windowData.window, ...newNumbers])].slice(-WINDOW_SIZE);

        const avg =
            windowData.window.length > 0
                ? (windowData.window.reduce((sum, num) => sum + num, 0) / windowData.window.length).toFixed(2)
                : 0;

        await windowData.save();

        return res.json({
            windowPrevState: prevState,
            windowCurrState: windowData.window,
            numbers: newNumbers,
            avg: parseFloat(avg),
        });

    } catch (error) {
        console.error("Error fetching numbers:", error.message);
        return res.status(500).json({ error: "Failed to fetch numbers" });
    }
};

module.exports = {
    numbers,
};
