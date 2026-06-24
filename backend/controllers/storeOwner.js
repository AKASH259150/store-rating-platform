const db = require("../config/db");

const storeOwnerDashboard = async(req, res)=>{
    try {

    const ownerId = req.user.userId;

    const [storeData] = await db.query(
      `
      SELECT
      s.id,
      s.name,
      ROUND(AVG(r.rating),1) AS averageRating

      FROM stores s

      LEFT JOIN ratings r
      ON s.id = r.store_id

      WHERE s.owner_id = ?

      GROUP BY s.id
      `,
      [ownerId]
    );

    const [ratings] = await db.query(
      `
      SELECT
      u.name,
      u.email,
      r.rating

      FROM ratings r

      JOIN users u
      ON r.user_id = u.id

      JOIN stores s
      ON s.id = r.store_id

      WHERE s.owner_id = ?
      `,
      [ownerId]
    );

    return res.status(200).json({
      success: true,
      store: storeData[0],
      ratings
    });

  } catch (err) {

    return res.status(500).json({
      success: false,
      message: err.message
    });

  }
}

module.exports = {storeOwnerDashboard}