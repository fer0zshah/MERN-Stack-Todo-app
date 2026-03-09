const router = require("express").Router();
const User = require("../model/user");
const bcrypt = require("bcryptjs"); 

// SIGN UP / REGISTER
router.post("/register", async (req, res) => {
    try {
    
        const { email, userName, password } = req.body;
        const salt = await bcrypt.genSalt(10); 
        const hashPassword = await bcrypt.hash(password, salt);
        const user = new User({ 
            email, 
            userName, 
            password: hashPassword 
        });

        await user.save();

        res.status(200).json({ message: "User Registered Successfully", user: user });

    } catch (error) {
        console.log("Error during registration:", error);

        res.status(400).json({ message: "User Already Exists or Registration Failed" });
    }
});

// SIGN IN / LOGIN
router.post("/signin", async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });

        if (!user) {
            return res.status(400).json({ message: "User not found. Please Sign Up first." });
        }
        const isPasswordCorrect = await bcrypt.compare(
            req.body.password, 
            user.password
        );

        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Password is Incorrect" });
        }
        const { password, ...others } = user._doc;
        res.status(200).json({ others });

    } catch (error) {
        res.status(400).json({ message: "Internal Server Error" });
    }
});

module.exports = router;