const User = require("../models/User")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")


function buildToken(user, secret, exp) {
    const payload = {
        _id: user._id,
        email: user.email
    }
    const options = {
        expiresIn: exp
    }
    return jwt.sign(payload, secret, options)
}


async function register(req, res) {
    try {
        const {email, password} = req.body
        if (!email || !password) {
            return res.status(400).json({message: "All fields required!"})
        }
        const hashed = bcrypt.hashSync(password, 10)
        const user = await User.create({email, password: hashed})
        if (user) {
            res.status(201).json({message: `User ${email} created!`})
        }
    } catch (err) {
        
        res.status(500).json({message: "Problem logging in!"})
    }
}
async function login(req, res) {
    try {
        const {email, password} = req.body
        if (!email || !password) {
            return res.status(400).json({message: "All fields required!"})
        }
        const user = await User.findOne({email: email})
        const verified = bcrypt.compareSync(password, user.password)
        if (!user || !verified) {
            return res.status(401).json({message: "Email or Password is incorrect!"})
        }
        const refreshToken = buildToken(user, process.env.REFRESH, "1d")
        const accessToken = buildToken(user, process.env.ACCESS, "1h")
        res.cookie("jwt", refreshToken, {
            httpOnly: true,
            sameSite: "None",
            secure: true
        })
        res.json(accessToken)
    } catch (err) {

        res.status(500).json({message: "Problem logging in!"})
    }
}
async function refreshHandle(req, res) {
    try {
        const auth = req.cookies.jwt
        const decoded = jwt.decode(auth, process.env.REFRESH)
        const user = await User.findById(decoded._id)
        if (user) {
            const accessToken = buildToken(user, process.env.ACCESS, "1h")
            res.json(accessToken)
        }
    } catch (err) {
        res.status(500).json({message: "Problem getting auth!"})
    }
}

module.exports = {
    register,
    login, 
    refreshHandle
}