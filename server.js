 const express = require("express");
const app = express();

app.use(express.json());
app.use(express.static(__dirname));

const users = [];

app.get("/api", (req, res) => {
    res.send("Food Ordering System Backend is Running!");
});

app.post("/register", (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({
            message: "Please fill all details"
        });
    }

    const existingUser = users.find(
        user => user.email === email.toLowerCase()
    );

    if (existingUser) {
        return res.status(400).json({
            message: "Email already registered"
        });
    }

    users.push({
        name,
        email: email.toLowerCase(),
        password
    });

    res.json({
        message: "Registration successful!"
    });
});

app.post("/login", (req, res) => {
    const { email, password } = req.body;

    const user = users.find(
        u => u.email === email.toLowerCase() &&
             u.password === password
    );

    if (!user) {
        return res.status(401).json({
            message: "Invalid email or password"
        });
    }

    res.json({
        message: "Login successful!",
        name: user.name
    });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
});