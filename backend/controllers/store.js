const db = require("../config/db");

const createStore = async(req, res) => {

    try {

        const { name, email, address, owner_id } = req.body;

        await db.query(
            `INSERT INTO stores (name, email, address, owner_Id)
        VALUES(?, ?, ?, ?)`,

            [name, email, address, owner_id]
        )
        return res.status(201).json({
            success: true,
            message: "store created"
        })

    }
    catch (err) {
        return res.status(400).json({
            success: false,
            message: err.message
        });
    }

}

const getAllStores = async (req, res) => {
  try {

    const [stores] = await db.query(`
      SELECT
      s.id,
      s.name,
      s.email,
      s.address,
      ROUND(AVG(r.rating),1) AS averageRating

      FROM stores s

      LEFT JOIN ratings r
      ON s.id = r.store_id

      GROUP BY s.id
    `);

    return res.status(200).json({
      success: true,
      stores
    });

  } catch (err) {

    return res.status(500).json({
      success: false,
      message: err.message
    });

  }
};

module.exports ={createStore, getAllStores};