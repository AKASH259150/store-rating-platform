const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../config/db");
const validate = require("../utils/validator");


const register = async (req, res) => {

    try {
        validate(req.body);
        const { name, email, password, address } = req.body;

        const [user] = await db.query(
            "SELECT * FROM users WHERE email = ?",
            [email]
        );

        if (user.length > 0) {
            throw new Error("Email already exists");
        }

        const hashedPass =await bcrypt.hash(password, 10);

        await db.query(
            `INSERT INTO users
            (name,email,password,address,role)
            VALUES(?,?,?,?,?)`,
            [
                name,
                email,
                hashedPass,
                address,
                "USER"
            ]
        );
        return res.status(201).json({
            success: true,
            message: "user register successfully"
        })
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({
            success: false,
            message: err.message || "internal server error",
        })
    }
}

const login = async (req, res) => {

    try {

        const { email, password } = req.body;


        if (!email || !password) {
            throw new Error("Email and Password are required");
        }

        const [users] = await db.query(
            "SELECT * FROM users WHERE email=?", [email]
        )

        if (users.length == 0) {
            throw new Error("Inavalid Credentials");
        }

        const matched =await bcrypt.compare(password, users[0].password);

        if (!matched) {
            throw new Error("inavalid credentials");
        }

        const token = jwt.sign({

            userId: users[0].id,
            role: users[0].role
        },

            process.env.JWT_SECRET_KEY,
            {
                expiresIn: "7d"
            }
        )
        return res.status(200).json({
            success: true,
            token,
            role: users[0].role

        })
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({
            success: false,
            message: err.message || "internal server error",
        })
    }

}

module.exports = { register, login }; 