const User = require("../model/User")
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")
const userRegister = async (req, res) => {
    try {

        const { name, email, password, role, status } = req.body;
        if (!name || !email || !password || !role || !status) {
            res.status(400).json({
                message: "All fields are required",
                status: 0,
            })
        }
        const exitsemail = await User.findOne({ email })
        if (exitsemail) {
            res.status(400).json({
                message: "Email Already exists",
                status: 0,
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const registerUser = new User({ name, email, password: hashedPassword, role, status });
        await registerUser.save();
        res.status(200).json({
            message: "registered successfully ",
            status: 1,

        })
    } catch (error) {
        console.log("error", error)
        res.status(500).json({
            message: "something went Wrong",
            status: 0,
        })
    }
}

const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const user = await User.findOne({ email });

        if (user && await bcrypt.compare(password, user.password)) {
            const token = jwt.sign({ email }, process.env.SECRET_KEY, { expiresIn: '1h' });
            return res.status(200).json({ message: "Login successful", token });
        } else {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch (error) {
        console.error(error);  
        return res.status(500).json({
            message: "An error occurred during login",
            status: 0
        });
    }
};


module.exports = {
    userRegister,
    userLogin
}