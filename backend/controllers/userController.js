const bcrypt = require("bcryptjs");
const db = require("../config/db");

const updatePassword = async (req, res) => {
  try {

    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
      throw new Error("All fields are required");
    }

    const [users] = await db.query(
      "SELECT * FROM users WHERE id = ?",
      [req.user.userId]
    );

    if (users.length === 0) {
      throw new Error("User not found");
    }

    const user = users[0];

    const matched = await bcrypt.compare(
      oldPassword,
      user.password
    );

    if (!matched) {
      throw new Error("Old password is incorrect");
    }

    const hashedPassword = await bcrypt.hash(
      newPassword,
      10
    );

    await db.query(
      "UPDATE users SET password=? WHERE id=?",
      [hashedPassword, req.user.userId]
    );

    return res.status(200).json({
      success: true,
      message: "Password updated successfully"
    });

  } catch (err) {

    return res.status(400).json({
      success: false,
      message: err.message
    });

  }
};

module.exports = { updatePassword };