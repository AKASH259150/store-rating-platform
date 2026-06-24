const db = require("../config/db");

const adminDashboard = async (req, res) => {
  try {

    const [[users]] = await db.query(
      "SELECT COUNT(*) AS totalUsers FROM users"
    );

    const [[stores]] = await db.query(
      "SELECT COUNT(*) AS totalStores FROM stores"
    );

    const [[ratings]] = await db.query(
      "SELECT COUNT(*) AS totalRatings FROM ratings"
    );

    return res.status(200).json({
      success: true,
      totalUsers: users.totalUsers,
      totalStores: stores.totalStores,
      totalRatings: ratings.totalRatings
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

const getAllUsers = async (req, res) => {
  try {

    const { name, email, role, address } = req.query;

    let query = `
      SELECT
      id,
      name,
      email,
      address,
      role,
      created_at
      FROM users
      WHERE 1=1
    `;

    const values = [];

    if (name) {
      query += " AND name LIKE ?";
      values.push(`%${name}%`);
    }

    if (email) {
      query += " AND email LIKE ?";
      values.push(`%${email}%`);
    }

    if (role) {
      query += " AND role = ?";
      values.push(role);
    }

    if (address) {
      query += " AND address LIKE ?";
      values.push(`%${address}%`);
    }

    const [users] = await db.query(query, values);

    return res.status(200).json({
      success: true,
      count: users.length,
      users
    });

  } catch (err) {

    return res.status(500).json({
      success: false,
      message: err.message || "Internal Server Error"
    });

  }
};

const getUserById = async (req, res) => {
  try {

    const userId = parseInt(req.params.id);

    if (isNaN(userId)) {
      throw new Error("Invalid User Id");
    }

    const [users] = await db.query(
      `
      SELECT
      id,
      name,
      email,
      address,
      role,
      created_at
      FROM users
      WHERE id = ?
      `,
      [userId]
    );

    if (users.length === 0) {
      throw new Error("User not found");
    }

    return res.status(200).json({
      success: true,
      user: users[0]
    });

  } catch (err) {

    return res.status(400).json({
      success: false,
      message: err.message
    });

  }
};

module.exports = {adminDashboard, getAllUsers, getUserById};