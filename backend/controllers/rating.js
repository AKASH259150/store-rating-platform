const db = require("../config/db");

const submitRating = async (req, res) => {
  try {

    const { storeId, rating } = req.body;

    if (rating < 1 || rating > 5) {
      throw new Error("Rating must be between 1 and 5");
    }

    await db.query(
      `INSERT INTO ratings(user_id, store_id, rating)
       VALUES(?,?,?)`,
      [
        req.user.userId,
        storeId,
        rating
      ]
    );

    return res.status(201).json({
      success: true,
      message: "Rating submitted successfully"
    });

  } catch (err) {

    return res.status(400).json({
      success: false,
      message: err.message
    });

  }
};

const updateRating = async(req, res)=>{

    try{
        const storeId = parseInt(req.params.storeId);
        const rating = parseInt(req.body.rating);

        if(isNaN(storeId)){
            throw new Error("invalid storeId");
        }

        if (rating < 1 || rating > 5) {
            throw new Error("Rating must be between 1 and 5");
        }


        await db.query(
        `UPDATE ratings SET rating=? WHERE user_id=? AND store_id=?`,
        [rating, req.user.userId, storeId]
    )
    return res.status(200).json({
        success:true,
        message:"store rating updated successfully"
    })
    }catch(err){
        return res.status(400).json({
            success:false,
            message:err.message||"internal server error"
        })
    }
   
}

module.exports = { submitRating, updateRating };