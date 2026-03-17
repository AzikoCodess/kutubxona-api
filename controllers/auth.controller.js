const User = require("../models/User.model")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const UserDto = require("../dtos/user.dto")

const register = async (req, res) => {
    try {
        const { login, password, } = req.body
        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = new User({ login, password: hashedPassword })
        await newUser.save()
        const userDto = new UserDto(newUser)
        res.status(201).json({ message: "User created successfully", userDto })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const login = async (req, res) => {
    try {
        const { login, password } = req.body
        const user = await User.findOne({ login })
        if (!user) {
            return res.status(404).json({ error: "Bunday foydalanuvchi topilmadi" })
        }
        const isPasswordValid = await bcrypt.compare(password, user.password)
        if (!isPasswordValid) {
            return res.status(401).json({ error: "Bunday foydalanuvchi topilmadi !" })
        }
        const userDto = new UserDto(user)
        const token = jwt.sign({ id: userDto.id, role: userDto.role }, process.env.JWT_SECRET, { expiresIn: "1h" })
        res.status(200).json({ userDto, token })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

module.exports = { login, register }